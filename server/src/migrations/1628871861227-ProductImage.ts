import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductImage1628871861227 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        insert into product_image ("productId", "imageUrl") values (1, 'https://res.cloudinary.com/kondition/image/upload/v1628852853/Ecommerce/backpack-1_gfqmaq.webp');
insert into product_image ("productId", "imageUrl") values (2, 'https://res.cloudinary.com/kondition/image/upload/v1628852853/Ecommerce/backpack-2_hqux3b.webp');
insert into product_image ("productId", "imageUrl") values (3, 'https://res.cloudinary.com/kondition/image/upload/v1628852853/Ecommerce/backpack-6_dcyv0p.webp');
insert into product_image ("productId", "imageUrl") values (4, 'https://res.cloudinary.com/kondition/image/upload/v1628852853/Ecommerce/backpack-5_f1s5xm.webp');
insert into product_image ("productId", "imageUrl") values (5, 'https://res.cloudinary.com/kondition/image/upload/v1628852853/Ecommerce/backpack-3_epmq7t.webp');
insert into product_image ("productId", "imageUrl") values (6, 'https://res.cloudinary.com/kondition/image/upload/v1628852853/Ecommerce/backpack-4_qxgwh2.webp');
insert into product_image ("productId", "imageUrl") values (7, 'https://res.cloudinary.com/kondition/image/upload/v1628852874/Ecommerce/jacket-6_mcnyqe.webp');
insert into product_image ("productId", "imageUrl") values (8, 'https://res.cloudinary.com/kondition/image/upload/v1628852873/Ecommerce/jacket-5_r5ndft.webp');
insert into product_image ("productId", "imageUrl") values (9, 'https://res.cloudinary.com/kondition/image/upload/v1628852873/Ecommerce/jacket-4_lzxvq2.webp');
insert into product_image ("productId", "imageUrl") values (10, 'https://res.cloudinary.com/kondition/image/upload/v1628852873/Ecommerce/jacket-2_wf6cky.webp');
insert into product_image ("productId", "imageUrl") values (11, 'https://res.cloudinary.com/kondition/image/upload/v1628852872/Ecommerce/jacket-3_xdk0zd.webp');
insert into product_image ("productId", "imageUrl") values (12, 'https://res.cloudinary.com/kondition/image/upload/v1628852872/Ecommerce/jacket-1_hbmeqh.webp');
insert into product_image ("productId", "imageUrl") values (13, 'https://res.cloudinary.com/kondition/image/upload/v1628852320/Ecommerce/shoes-5_zrom1z.webp');
insert into product_image ("productId", "imageUrl") values (14, 'https://res.cloudinary.com/kondition/image/upload/v1628852319/Ecommerce/shoes-4_vktwk7.webp');
insert into product_image ("productId", "imageUrl") values (15, 'https://res.cloudinary.com/kondition/image/upload/v1628852319/Ecommerce/shoes-3_tzw6oa.webp');
insert into product_image ("productId", "imageUrl") values (16, 'https://res.cloudinary.com/kondition/image/upload/v1628852320/Ecommerce/shoes-2_vrx9jq.webp');
insert into product_image ("productId", "imageUrl") values (17, 'https://res.cloudinary.com/kondition/image/upload/v1628852319/Ecommerce/shoes-1_s67wun.webp');
insert into product_image ("productId", "imageUrl") values (18, 'https://res.cloudinary.com/kondition/image/upload/v1628852319/Ecommerce/shoes-6_ae4syl.webp');
insert into product_image ("productId", "imageUrl") values (19, 'https://res.cloudinary.com/kondition/image/upload/v1628872527/Ecommerce/shoes-7_wpmpml.webp');
insert into product_image ("productId", "imageUrl") values (20, 'https://res.cloudinary.com/kondition/image/upload/v1628872530/Ecommerce/shoes-8_dtefdm.webp');

        `);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
