import Redis from "ioredis";

const MAX_RETRIES = 5;
let retries = 0;

const redisClient = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  // password: process.env.REDIS_PASSWORD, // Uncomment if using a password
});

const connectWithRetry = () => {
  if (redisClient.status !== "connecting" && redisClient.status !== "connected") {
    redisClient.connect().catch((err) => {
      if (retries < MAX_RETRIES) {
        retries++;
        console.log(`Retrying to connect to Redis... Attempt ${retries}`);
        setTimeout(connectWithRetry, Math.min(1000 * retries, 10000)); // Exponential backoff
      } else {
        console.error("Could not connect to Redis after several attempts:", err);
        // Handle the failure case here
      }
    });
  } else {
    console.log("Redis is already connecting or connected. No further attempts will be made.");
  }
};

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", err);
});

redisClient.on("connect", () => {
  console.log("Redis is connected on port", redisClient.options.port);
  retries = 0; // Reset retries on successful connection
});

connectWithRetry();

export default redisClient;




// import Redis from "ioredis";



// const redisClient = new Redis({
//   host: process.env.REDIS_HOST || "localhost",
//   port: process.env.REDIS_PORT || 6379,
//   // You can add other configurations like password, database number, etc.
//   // password: process.env.REDIS_PASSWORD,
// });

// redisClient.on("error", (err) => {
//   console.log("Redis Client Error", err);
//   throw new Error(err);
// });

// redisClient.on("connect", () => {
//   console.log("Redis is connected");
// });

// // await redisClient.connect();

// export default redisClient;
