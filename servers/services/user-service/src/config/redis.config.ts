import Redis from "ioredis";
import { UserType } from "../Types";


const MAX_RETRIES = 5;
let retries = 0;

const redisClient = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.NODE_ENV === "production" ? process.env.REDIS_PASSWORD : undefined,
});

// const connectWithRetry = () => {
//   if (redisClient.status !== "connecting" && redisClient.status !== "ready") {
//     redisClient.connect().catch((err) => {
//       if (retries < MAX_RETRIES) {
//         retries++;
//         console.log(`Retrying to connect to Redis... Attempt ${retries}`);
//         setTimeout(connectWithRetry, Math.min(1000 * retries, 10000)); // Exponential backoff
//       } else {
//         console.error("Could not connect to Redis after several attempts:", err);
//         // Handle the failure case here
//       }
//     });
//   } else {
//     console.log("Redis is already connecting or connected. No further attempts will be made.");
//   }
// };

redisClient.on("error", (err) => {
  console.error("Redis Client Error:", );
  // connectWithRetry();

});

redisClient.on("connect", () => {
  console.log("Redis is connected on port", redisClient.options.port);
  retries = 0; // Reset retries on successful connection
});



export default redisClient;






/**
 * 
 *  Redis Keys for Blog Service
 */

export const R_USER = (email: string) : string => `user-service:users:${email}`;




/**
 *  Redis Methods for Blog Service
 */

// set recent blogs cache



export function SetUser(user : UserType, expiry= 60*60*24){
    redisClient.setex(R_USER(user.username), expiry, JSON.stringify(user));
}

export async function GetUser(username: string): Promise<UserType | null>{
    const user = await redisClient.get(R_USER(username));
    if(user){
        return JSON.parse(user);
    }
    return null;
}

export function DeleteUser(username: string){
    redisClient.del(R_USER(username));
}