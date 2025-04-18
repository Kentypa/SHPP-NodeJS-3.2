import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1744991965894 implements MigrationInterface {
    name = 'Init1744991965894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying(60) NOT NULL, "password" character varying(100) NOT NULL, "role" smallint NOT NULL DEFAULT '1', "refreshToken" character varying(150), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
