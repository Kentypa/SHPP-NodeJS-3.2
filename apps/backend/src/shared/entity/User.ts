import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Role } from "../enum/role.enum";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 60 })
  email: string;

  @Column({ type: "varchar", length: 100 })
  password: string;

  @Column({ type: "smallint", default: Role.USER })
  role: Role;

  @Column({ type: "varchar", length: 150, nullable: true })
  refreshToken: string;
}
