import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAnimals1716041583732 implements MigrationInterface {
    name = 'CreateAnimals1716041583732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`animals\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`animals\``);
    }

}
