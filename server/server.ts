import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";
import * as dotenv from "dotenv";
import express from "express";
import { importSchema } from "graphql-import";
import http from "http";
import mongoose from "mongoose";
import { resolvers } from "./src/resolvers";

dotenv.config();
console.log(process.env.DATABASE);
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
    console.log(error);
  }
};

db();

const httpServer = http.createServer();

const schema = makeExecutableSchema({
  typeDefs: importSchema("./schema.graphql"),
  resolvers,
});

const apolloServer = new ApolloServer({
  schema,
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
