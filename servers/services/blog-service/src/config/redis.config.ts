import Redis from "ioredis";
import { BlogType } from "kedium-types";

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


export const R_BLOGS : string = `blog-service:blogs`;
export const R_BLOG = (slug: string) : string => `blog-service:blogs:${slug}`;
export const R_RECENT_BLOGS = (skip: number, limit: number) : string => `blog-service:recent-blogs:${skip}:${limit}`;
export const R_TRENDING_BLOGS = (skip: number, limit: number):string => `blog-service:trending-blogs:${skip}:${limit}`;
export const R_USER_BLOGS = (skip: number, limit: number):string => `blog-service:user-blogs:${skip}:${limit}`;




/**
 *  Redis Methods for Blog Service
 */

// set recent blogs cache
export function SetRecentBlogsCache(blogs : BlogType[], skip: number, limit: number, expiry : number){
    redisClient.setex(R_RECENT_BLOGS(skip, limit), expiry, JSON.stringify(blogs));
}
export function GetRecentBlogsCache(skip: number, limit: number){
    return redisClient.get(R_RECENT_BLOGS(skip, limit));
}

// set trending blogs cache
export function SetTrendingBlogsCache(blogs : BlogType[], skip: number, limit: number, expiry : number){
    redisClient.setex(R_TRENDING_BLOGS(skip, limit), expiry, JSON.stringify(blogs));
}
export function GetTrendingBlogsCache(skip: number, limit: number){
    return redisClient.get(R_TRENDING_BLOGS(skip, limit));
} 

// set user blogs cache
export function SetUserBlogsCache(blogs : BlogType[], skip: number, limit: number, expiry : number){
    redisClient.setex(R_USER_BLOGS(skip, limit), expiry, JSON.stringify(blogs));
}
export function GetUserBlogsCache(skip: number, limit: number){
    return redisClient.get(R_USER_BLOGS(skip, limit));
} 


// set blog cache
export function SetBlogCache(blog : BlogType, expiry : number){
    redisClient.setex(R_BLOG(blog.slug), expiry, JSON.stringify(blog));
}

// set blog category cache
export function SetBlogCategoryCache(category : string, blogs : BlogType[], expiry : number){
    redisClient.setex(R_BLOG(category), expiry, JSON.stringify(blogs));
}

export function GetBlogCategoryCache(category : string){
    return redisClient.get(R_BLOG(category));
}

// get blog cache with string to parse 
export function GetBlogCache(slug : string){
    return redisClient.get(R_BLOG(slug));
}


export function GetBlogsCache(){
    return redisClient.get(R_BLOGS);
}

export function SetBlogsCache(blogs : BlogType[], expiry : number){
    redisClient.setex(R_BLOGS, expiry, JSON.stringify(blogs));
}

export function DeleteBlogCache(slug : string){
    redisClient.del(R_BLOG(slug));
}

export function DeleteBlogsCache(){
    redisClient.del(R_BLOGS);
}