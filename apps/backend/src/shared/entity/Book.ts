import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from "typeorm";
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
  totalViews: number;

  @Column({ type: "smallint", default: 0 })
  totalClick: number;

  @Column({ type: "varchar", length: 255 })
  image: string;

  @ManyToMany(() => Author, (author) => author.books)
  @JoinTable({
    name: "book_authors",
    joinColumn: {
      name: "book_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "author_id",
      referencedColumnName: "id",
    },
  })
  authors: Author[];
}
