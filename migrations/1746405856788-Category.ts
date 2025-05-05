import { MigrationInterface, QueryRunner } from 'typeorm';

export class Category1746405856788 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.query(`
            CREATE TABLE "categories" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                CONSTRAINT "PK_categories" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            INSERT INTO "categories" ("id", "name") VALUES
            (uuid_generate_v4(), 'Lanche'),
            (uuid_generate_v4(), 'Acompanhamento'),
            (uuid_generate_v4(), 'Bebida'),
            (uuid_generate_v4(), 'Sobremesa')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp"`);
  }
}
