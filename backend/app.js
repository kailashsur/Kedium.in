import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./utils/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";

//graphql imports
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import gql from "graphql-tag";
import gqlSchema from "./graphql/schema.js";
import gqlResolver from "./graphql/resolver.js";

import blogRoutes from "./routes/blogRoutes.js";

import redisClient from "./config/redis.js";
import { authorized } from "./lib/services.graphql.js";
import { connectKafka } from "./config/kafka.js";
import logger from "./utils/logger.js";

//-----Import Statement End -----

const app = express();
const PORT = process.env.PORT || 8000;
const DATABASE_URI = process.env.DATABASE_URI;

// Connect to MongoDB
connectDB(DATABASE_URI);

// Middleware
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" })); // Increase the limit to 50MB or as needed
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // Increase the limit for urlencoded data as well

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(cookieParser());

// Redis middleware example for caching
app.use((req, res, next) => {
  req.redisClient = redisClient; // Attach Redis client to request object
  next();
});

//********************************* Graphql

// Example functions for context setup

const apolloServer = new ApolloServer({
  typeDefs: gqlSchema,
  resolvers: gqlResolver,
  introspection: true, // Enable introspection
  playground: true, // Enable GraphQL Playground
  csrfPrevention: true,
  cache: "bounded",
});
// apolloServer Start command
await apolloServer.start();

// apolloServer is used as middleware with express js
app.use(
  "/graphql",
  bodyParser.json(),
  expressMiddleware(apolloServer, {
    context: async ({ req }) => {
      return {
        authorization: req.headers?.authorization
          ? await authorized(req.headers.authorization)
          : null,
      };
    },
  }),
);

//************************************************************************* */
// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Kedium API");
});

// Routes
app.use("/api/v1/u/", userRouter);
app.use("/api/v1/u/auth/", authRoutes);
app.use("/api/v1/u/blog/", blogRoutes);

//Error Handler
app.use(errorHandler);

// Start the server
app.listen(PORT, async () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
  // await connectKafka();
});
