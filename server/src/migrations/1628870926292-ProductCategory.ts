import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductCategory1628870926292 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        insert into product_categories_product_category ("productId", "productCategoryId") values (1, 1);
insert into product_categories_product_category ("productId", "productCategoryId") values (2, 1);
insert into product_categories_product_category ("productId", "productCategoryId") values (3, 1);
insert into product_categories_product_category ("productId", "productCategoryId") values (4, 1);
insert into product_categories_product_category ("productId", "productCategoryId") values (5, 1);
insert into product_categories_product_category ("productId", "productCategoryId") values (6, 1);
insert into product_categories_product_category ("productId", "productCategoryId") values (7, 2);
insert into product_categories_product_category ("productId", "productCategoryId") values (8, 2);
insert into product_categories_product_category ("productId", "productCategoryId") values (9, 2);
insert into product_categories_product_category ("productId", "productCategoryId") values (10, 2);
insert into product_categories_product_category ("productId", "productCategoryId") values (11, 2);
insert into product_categories_product_category ("productId", "productCategoryId") values (12, 2);
insert into product_categories_product_category ("productId", "productCategoryId") values (13, 3);
insert into product_categories_product_category ("productId", "productCategoryId") values (14, 3);
insert into product_categories_product_category ("productId", "productCategoryId") values (15, 3);
insert into product_categories_product_category ("productId", "productCategoryId") values (16, 3);
insert into product_categories_product_category ("productId", "productCategoryId") values (17, 3);
insert into product_categories_product_category ("productId", "productCategoryId") values (18, 3);
insert into product_categories_product_category ("productId", "productCategoryId") values (19, 3);
insert into product_categories_product_category ("productId", "productCategoryId") values (20, 3);
        `);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
