import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { Product } from "../entities/Product";
import { FieldError } from "./user";

@ObjectType()
class ProductResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Product, { nullable: true })
  product?: Product;
}

@Resolver(Product)
export class ProductResolver {
  @Query(() => [Product])
  async getProducts() {
    const products = await Product.find({ relations: ["images"] });

    return products;
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
