import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDescriptionColumnToCoffee1768116664001
  implements MigrationInterface
{
  name = 'AddDescriptionColumnToCoffee1768116664001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffees" ADD "description" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coffees" DROP COLUMN "description"`);
  }
}
