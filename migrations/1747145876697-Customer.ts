import { MigrationInterface, QueryRunner } from "typeorm";

export class Customer1747145876697 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE customer (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            name VARCHAR(255),
            cpf CHAR(11) UNIQUE,
            email VARCHAR(255) UNIQUE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE customer;`);
    }

}
