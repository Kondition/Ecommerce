import bcrypt from "bcrypt";
import { schemas, validate } from "../utils/validations";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { User } from "../entities/User";
import { MyContext } from "../types";

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }

    return User.findOne(req.session.userId);
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = await validate(schemas.register, {
      username,
      email,
      password,
    });

    if (errors) return { errors };

    const hashedPassword = await bcrypt.hash(password, 12);

    try {
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      }).save();

      req.session.userId = user.id;

      return { user };
    } catch (error) {
      if (error.code === "23505") {
        const errors: FieldError[] = [];
        if (error.detail.includes("username")) {
          errors.push({ field: "username", message: "Username is taken" });

          const userWithEmail = await User.findOne({ email });
          if (userWithEmail) {
            errors.push({ field: "email", message: "Email is used" });
          }
        } else {
          errors.push({ field: "email", message: "Email is used" });

          const userWithName = await User.findOne({ username });
          if (userWithName) {
            errors.push({ field: "username", message: "Username is taken" });
          }
        }

        return { errors };
      }

      return { errors: [{ field: "server", message: "Server Error" }] };
    }
  }
}
