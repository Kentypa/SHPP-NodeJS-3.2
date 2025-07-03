import { Request, Response } from "express";
import { pool } from "../config/db.config";
import { validate } from "class-validator";
import { AddBookDto } from "../dto/add-book.dto";
import path from "path";

export const addBook = async (req: Request, res: Response) => {
  const client = await pool.connect();
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

    await client.query("BEGIN");

    const bookQuery = `
      INSERT INTO book (name, year, description, image, total_click, total_views)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`;

    const bookResult = await client.query(bookQuery, [
      bookDto.name,
      bookDto.year,
      bookDto.description,
      `/uploads/${req.file.filename}`,
      0,
      0,
    ]);

    const book = bookResult.rows[0];
    const bookAuthors = [];

    for (const authorName of bookDto.authors) {
      let authorQuery = "SELECT * FROM author WHERE name = $1";
      let authorResult = await client.query(authorQuery, [authorName]);
      let author;

      if (authorResult.rows.length === 0) {
        const createAuthorQuery =
          "INSERT INTO author (name) VALUES ($1) RETURNING *";
        const newAuthorResult = await client.query(createAuthorQuery, [
          authorName,
        ]);
        author = newAuthorResult.rows[0];
      } else {
        author = authorResult.rows[0];
      }

      const linkQuery =
        "INSERT INTO book_authors (book_id, author_id) VALUES ($1, $2)";
      await client.query(linkQuery, [book.id, author.id]);
      bookAuthors.push(author.name);
    }

    await client.query("COMMIT");

    return res.status(201).send({
      success: true,
      book: {
        id: book.id,
        name: book.name,
        year: book.year,
        description: book.description,
        image: book.image,
        authors: bookAuthors,
      },
    });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error adding book:", error);
    return res
      .status(500)
      .send({ success: false, error: "Internal server error" });
  } finally {
    client.release();
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const query = `
      SELECT 
        b.id, b.name, b.year, b.description, b.image, b.total_click,
        ARRAY_AGG(a.name ORDER BY a.name) as authors
      FROM book b
      LEFT JOIN book_authors ba ON b.id = ba.book_id
      LEFT JOIN author a ON ba.author_id = a.id
      WHERE b.deleted_at IS NULL
      GROUP BY b.id, b.name, b.year, b.description, b.image, b.total_click
      ORDER BY b.id`;

    const result = await pool.query(query);

    return res.send({
      success: true,
      books: result.rows.map((book) => ({
        id: book.id,
        name: book.name,
        year: book.year,
        description: book.description,
        image: book.image,
        totalClick: book.total_click,
        authors: book.authors.filter((author) => author !== null),
      })),
    });
  } catch (error) {
    console.error("Error getting books:", error);
    return res
      .status(500)
      .send({ success: false, error: "Internal server error" });
  }
};

export const getBooksByPage = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.offset as string) || 10;
    const offset = (page - 1) * limit;

    const countQuery = "SELECT COUNT(*) FROM book WHERE deleted_at IS NULL";
    const countResult = await pool.query(countQuery);
    const total = parseInt(countResult.rows[0].count);

    const query = `
      SELECT 
        b.id, b.name, b.year, b.description, b.image, b.total_click,
        ARRAY_AGG(a.name ORDER BY a.name) as authors
      FROM book b
      LEFT JOIN book_authors ba ON b.id = ba.book_id
      LEFT JOIN author a ON ba.author_id = a.id
      WHERE b.deleted_at IS NULL
      GROUP BY b.id, b.name, b.year, b.description, b.image, b.total_click
      ORDER BY b.id
      LIMIT $1 OFFSET $2`;

    const result = await pool.query(query, [limit, offset]);

    return res.send({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      books: result.rows.map((book) => ({
        id: book.id,
        name: book.name,
        year: book.year,
        description: book.description,
        image: book.image,
        totalClick: book.total_click,
        authors: book.authors.filter((author) => author !== null),
      })),
    });
  } catch (error) {
    console.error("Error getting books by page:", error);
    return res
      .status(500)
      .send({ success: false, error: "Internal server error" });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send({
        success: false,
        error: "Invalid book ID",
      });
    }

    const query = `
      SELECT 
        b.id, b.name, b.year, b.description, b.image, b.total_click,
        ARRAY_AGG(a.name ORDER BY a.name) as authors
      FROM book b
      LEFT JOIN book_authors ba ON b.id = ba.book_id
      LEFT JOIN author a ON ba.author_id = a.id
      WHERE b.id = $1 AND b.deleted_at IS NULL
      GROUP BY b.id, b.name, b.year, b.description, b.image, b.total_click`;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).send({
        success: false,
        error: "Book not found",
      });
    }

    const book = result.rows[0];

    return res.send({
      success: true,
      book: {
        id: book.id,
        name: book.name,
        year: book.year,
        description: book.description,
        image: book.image,
        totalClick: book.total_click,
        authors: book.authors.filter((author) => author !== null),
      },
    });
  } catch (error) {
    console.error("Error getting book by ID:", error);
    return res
      .status(500)
      .send({ success: false, error: "Internal server error" });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = Number(req.params.id);
    if (isNaN(bookId)) {
      return res.status(400).send({
        success: false,
        error: "Invalid book ID",
      });
    }

    const bookQuery = "SELECT * FROM book WHERE id = $1 AND deleted_at IS NULL";
    const bookResult = await pool.query(bookQuery, [bookId]);

    if (bookResult.rows.length === 0) {
      return res.status(404).send({
        success: false,
        error: "Book not found",
      });
    }

    const deleteQuery =
      "UPDATE book SET deleted_at = CURRENT_TIMESTAMP WHERE id = $1";
    await pool.query(deleteQuery, [bookId]);

    return res.send({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    return res.status(500).send({
      success: false,
      error: "Internal server error",
    });
  }
};

export const incrementViews = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send({ success: false, error: "Invalid book ID" });
    }

    const query =
      "UPDATE book SET total_views = total_views + 1 WHERE id = $1 AND deleted_at IS NULL RETURNING *";
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).send({ success: false, error: "Book not found" });
    }

    return res.send({ success: true, message: "View count incremented" });
  } catch (error) {
    console.error("Error incrementing views:", error);
    return res
      .status(500)
      .send({ success: false, error: "Internal server error" });
  }
};

export const incrementClicks = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send({ success: false, error: "Invalid book ID" });
    }

    const query =
      "UPDATE book SET total_click = total_click + 1 WHERE id = $1 AND deleted_at IS NULL RETURNING *";
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).send({ success: false, error: "Book not found" });
    }

    return res.send({ success: true, message: "Click count incremented" });
  } catch (error) {
    console.error("Error incrementing clicks:", error);
    return res
      .status(500)
      .send({ success: false, error: "Internal server error" });
  }
};
