import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Book } from "../shared/entity/Book";
import { Author } from "../shared/entity/Author";
import { validate } from "class-validator";
import { AddBookDto } from "../dto/add-book.dto";
import fs from "fs/promises";
import path from "path";

export const addBook = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send({
        success: false,
        error: "Book image is required",
      });
    }

    const bookDto = new AddBookDto();
    bookDto.name = req.body.name;
    bookDto.year = req.body.year;
    bookDto.description = req.body.description;

    const authors = [];
    if (Array.isArray(req.body.authors)) {
      authors.push(...req.body.authors.filter(Boolean));
    } else {
      for (const key in req.body) {
        if (key.startsWith("authors[")) {
          const authorName = req.body[key];
          if (authorName) {
            authors.push(authorName);
          }
        }
      }
    }
    bookDto.authors = authors;

    const errors = await validate(bookDto);
    if (errors.length > 0) {
      return res.status(400).send({
        success: false,
        error: errors.map((e) => Object.values(e.constraints)).flat(),
      });
    }

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const authorRepository = queryRunner.manager.getRepository(Author);
      const bookRepository = queryRunner.manager.getRepository(Book);

      const book = new Book();
      book.name = bookDto.name;
      book.year = bookDto.year;
      book.description = bookDto.description;
      book.image = `/uploads/${req.file.filename}`;
      book.totalClick = 0;

      book.authors = [];

      for (const authorName of bookDto.authors) {
        let author = await authorRepository.findOne({
          where: { name: authorName },
        });

        if (!author) {
          author = new Author();
          author.name = authorName;
          author = await authorRepository.save(author);
        }

        book.authors.push(author);
      }

      const savedBook = await bookRepository.save(book);

      console.log("Saved book with authors:", {
        id: savedBook.id,
        name: savedBook.name,
        authors: savedBook.authors.map((a) => ({ id: a.id, name: a.name })),
      });

      await queryRunner.commitTransaction();

      return res.status(201).send({
        success: true,
        book: {
          id: book.id,
          name: book.name,
          year: book.year,
          description: book.description,
          image: book.image,
          authors: book.authors.map((a) => a.name),
        },
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error("Transaction error:", error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  } catch (error) {
    console.error("Error adding book:", error);
    return res
      .status(500)
      .send({ success: false, error: "Internal server error" });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const bookRepository = AppDataSource.getRepository(Book);

    const books = await bookRepository
      .createQueryBuilder("book")
      .leftJoinAndSelect("book.authors", "author")
      .getMany();

    return res.send({
      success: true,
      books: books.map((book) => ({
        id: book.id,
        name: book.name,
        year: book.year,
        description: book.description,
        image: book.image,
        totalClick: book.totalClick,
        authors: book.authors.map((a) => a.name),
      })),
    });
  } catch (error) {
    console.error("Error getting books:", error);
    return res
      .status(500)
      .send({ success: false, error: "Internal server error" });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const queryRunner = AppDataSource.createQueryRunner();
  try {
    const bookId = Number(req.query.id);

    if (isNaN(bookId)) {
      return res.status(400).send({
        success: false,
        error: "Invalid book ID",
      });
    }

    await queryRunner.connect();
    await queryRunner.startTransaction();

    const bookRepository = queryRunner.manager.getRepository(Book);
    const authorRepository = queryRunner.manager.getRepository(Author);

    const book = await bookRepository.findOne({
      where: { id: bookId },
      relations: ["authors"],
    });

    if (!book) {
      return res.status(404).send({
        success: false,
        error: "Book not found",
      });
    }

    if (book.image) {
      try {
        const imagePath = path.join(
          __dirname,
          "..",
          "uploads",
          path.basename(book.image)
        );

        await fs.access(imagePath);
        await fs.unlink(imagePath);
      } catch (fileError) {
        console.error("Error deleting image:", fileError);
      }
    }

    await bookRepository.remove(book);

    for (const author of book.authors) {
      const authorWithBooks = await authorRepository.findOne({
        where: { id: author.id },
        relations: ["books"],
      });

      if (authorWithBooks && authorWithBooks.books.length === 0) {
        await authorRepository.remove(authorWithBooks);
      }
    }

    await queryRunner.commitTransaction();

    return res.send({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error("Error deleting book:", error);
    return res.status(500).send({
      success: false,
      error: "Internal server error",
    });
  } finally {
    await queryRunner.release();
  }
};
