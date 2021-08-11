import "reflect-metadata";
import "dotenv/config";
import path from "path";
import express from "express";
import session from "express-session";
import cors from "cors";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { __prod__, COOKIE_NAME } from "./constants";
import { User } from "./entities/User";
import { UserResolver } from "./resolvers/user";

const main = async () => {
  // Database Connection
  await createConnection({
    type: "postgres",
    logging: true,
    synchronize: !__prod__,
    url: process.env.DATABASE_URL,
    migrations: [path.join(__dirname, "./grations/*")],
    entities: [User],
  });

  // await dbConnection.runMigrations();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  const app = express();
  // Application behind a proxy (Nginx)
  app.set("trust proxy", 1);
  // Allow client to access ressources and passes credentials as header
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );
  // Session based authentication
  app.use(
    session({
      name: COOKIE_NAME,
      saveUninitialized: false,
      resave: false,
      secret: process.env.SESSION_SECRET,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 1 month
        httpOnly: true,
        sameSite: "lax", // CSRF
        secure: __prod__, // Cookie only works in https
        domain: __prod__ ? "" : undefined,
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors: false, // Already enabled for whole app
  });

  app.listen(parseInt(process.env.PORT), () =>
    console.log(`Server started on localhost:${process.env.PORT}`)
  );
};

main().catch((error) => console.error(error));
