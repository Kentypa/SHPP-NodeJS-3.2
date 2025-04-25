import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Author } from "./Author";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 60 })
  name: string;

  @Column({ type: "varchar", length: 100 })
  description: string;

  @Column({ type: "varchar", length: 5 })
  year: string;

  @Column({ type: "smallint", default: 0 })
  totalClick: number;

  @Column({ type: "varchar", length: 255 })
  image: string;

  @ManyToMany(() => Author, (author) => author.books)
  authors: Author[];
}
