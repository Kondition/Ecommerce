import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductCategory1628864615029 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        insert into product_category (name) values('backpack');
        insert into product_category (name) values('jacket');
        insert into product_category (name) values('boots');
        `);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
