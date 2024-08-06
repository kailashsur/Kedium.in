// import { createClient } from "redis";
import Redis from "ioredis";

// const redisClient = createClient({
//   host: process.env.REDIS_HOST || "localhost",
//   port: process.env.REDIS_PORT || 6379,
//   // You can add other configurations like password, database number, etc.
//   // password: process.env.REDIS_PASSWORD,
// });

// redisClient.on("error", (err) => console.log("Redis Client Error", err));

// redisClient.on("connect", () => {
//   console.log("Redis is connected");
// });

// await redisClient.connect();

// export default redisClient;

const redisClient = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  // You can add other configurations like password, database number, etc.
  // password: process.env.REDIS_PASSWORD,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

redisClient.on("connect", () => {
  console.log("Redis is connected");
});

// await redisClient.connect();

export default redisClient;
