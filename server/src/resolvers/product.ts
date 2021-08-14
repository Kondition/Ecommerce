import {
  Arg,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { Product } from "../entities/Product";
import { ProductCategory } from "../entities/ProductCategory";
import { FieldError } from "./user";

@ObjectType()
class ProductResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Product, { nullable: true })
  product?: Product;
}

@ObjectType()
class ProductsResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => [Product], { nullable: true })
  products?: Product[];

  @Field()
  hasMore?: boolean;
}

@Resolver(Product)
export class ProductResolver {
  @Query(() => ProductsResponse)
  async getProducts(
    @Arg("limit", () => Int) limit: number,
    @Arg("categories", () => [Int], { nullable: true }) categories: number[],
    @Arg("minPrice", () => Int, { nullable: true }) minPrice: number,
    @Arg("maxPrice", () => Int, { nullable: true }) maxPrice: number
  ): Promise<ProductsResponse> {
    const realLimit = Math.min(8, limit);
    const realLimitPlusOne = realLimit + 1;

    let products;

    products = Product.createQueryBuilder("product")
      .limit(realLimitPlusOne)
      .leftJoinAndSelect("product.images", "product_image");

    if (categories) {
      products
        .innerJoin(
          "product.categories",
          "product_category",
          "product_category.id IN (:...categories)",
          { categories }
        )
        .innerJoinAndSelect("product.categories", "categories");
    } else {
      products.leftJoinAndSelect("product.categories", "product_category");
    }

    if (minPrice) {
      products.where("product.price >= :minPrice", { minPrice });
    }

    if (maxPrice) {
      products.where("product.price <= :maxPrice", { maxPrice });
    }

    products = await products.getMany();

    console.log("Products: ", products);

    return {
      products: products.slice(0, realLimit),
      hasMore: products.length === realLimitPlusOne,
    };
  }

  @Query(() => [ProductCategory])
  async getProductCategories() {
    const categories = await ProductCategory.find();

    return categories;
  }

  @Mutation(() => ProductResponse)
  async createProduct(
    @Arg("name") name: string,
    @Arg("description") description: string,
    @Arg("price") price: number
  ): Promise<ProductResponse> {
    const product = await Product.create({ name, description, price }).save();

    return { product };
  }
}
