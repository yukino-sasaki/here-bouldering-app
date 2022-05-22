import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";
import * as dotenv from "dotenv";
import express from "express";
import { importSchema } from "graphql-import";
import http from "http";
import mongoose from "mongoose";
import cron from "node-cron";
import { authorization } from "./firebase";
import { resetClimbingTime } from "./src/resetClimbingTime";
import { resolvers } from "./src/resolvers";
export type Context = {
  id: string;
  email?: string;
};

dotenv.config();
const app = express();

const db = async () => {
  try {
    if (!process.env.DATABASE) {
      throw new Error(`process.env.DATABASE is ${process.env.DATABASE}`);
    }
    await mongoose
      .connect(process.env.DATABASE, {})
      .then(() => console.log("DB connected"))
      .catch((err) => console.log("DB Error => ", err));
  } catch (error) {
    throw error;
  }
};

db();

const httpServer = http.createServer();

const schema = makeExecutableSchema({
  typeDefs: importSchema("./schema.graphql"),
  resolvers,
});

let authLink: any = "";

const apolloServer = new ApolloServer({
  schema,
  context: async ({ req }): Promise<Context | null> => {
    authLink = req.headers ? req.headers : "";
    const idToken = req.headers.authorization?.replace(/^Bearer /, "");
    if (!idToken) {
      throw new Error(`auth token is falsy. auth is ${req.headers}`);
    }

    try {
      const decoded = await authorization.verifyIdToken(idToken);
      return {
        id: decoded.uid,
        email: decoded.email,
      };
    } catch (err) {
      return null;
    }
  },
});
const startServer = async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
  });
};

startServer();

//port
app.listen(process.env.PORT, () => {
  console.log(`server is ready at localhost:${process.env.PORT}`);
  console.log(
    `graphql server is ready at localhost:${process.env.PORT}${apolloServer.graphqlPath}`
  );
});

cron.schedule("0 0 0 * * *", async () => {
  resetClimbingTime();
});
