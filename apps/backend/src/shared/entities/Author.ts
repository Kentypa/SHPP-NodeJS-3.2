import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Book } from "./Book";

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 60 })
  name: string;

  @ManyToMany(() => Book, (book) => book.authors)
  books: Book[];
}
