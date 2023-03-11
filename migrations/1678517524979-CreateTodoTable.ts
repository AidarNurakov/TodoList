import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTodoTable1678517524979 implements MigrationInterface {
  name = 'CreateTodoTable1678517524979';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "todo" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "todoContent" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "todo"`);
  }
}
