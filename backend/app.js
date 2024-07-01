import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./utils/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/schema.js";
import resolver from "./graphql/resolver.js";
import blogRoutes from "./routes/blogRoutes.js";

import redisClient from "./config/redis.js";

//-----Import Statement End -----

const app = express();
const PORT = process.env.PORT || 8000;
const DATABASE_URI = process.env.DATABASE_URI;

// Connect to MongoDB
connectDB(DATABASE_URI);

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

// Redis middleware example for caching
app.use((req, res, next) => {
  req.redisClient = redisClient; // Attach Redis client to request object
  next();
});





// Graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true, // Enable GraphiQL interface for testing
  }),
);
// Routes
app.use("/api/v1/u/", userRouter);
app.use("/api/v1/u/auth/", authRoutes);
app.use("/api/v1/u/blog/", blogRoutes);

//Error Handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
