import app from "./app";
import CONNECT_MONGODB from "./config/db.config";
import redisClient from "./config/redis.config";
import { CreateBlogConsumer } from "./controllers/services/consumer/create-blog.consumer";
import CreateCommentConsumer from "./controllers/services/consumer/create-comment.consumer";
import { DeleteBlogConsumer } from "./controllers/services/consumer/delete-blog.consumer";
import { DeleteCommentConsumer } from "./controllers/services/consumer/delete-comment.consummer";
import { UpdateBlogConsumer } from "./controllers/services/consumer/update-blog.consumer";
import { UpdateCommentConsumer } from "./controllers/services/consumer/update-comment.consumer";
import logger from "./utils/logger";
import { NextFunction, Request, Response } from "express";



declare module "express-serve-static-core" {

  export interface Request {

    redisClient?: typeof redisClient;

  }

}


const maxRetries = 5;
let attempt = 0;
const connectKafka = async () => {
  try {
    // Call consumers
    CreateBlogConsumer();
    UpdateBlogConsumer();
    DeleteBlogConsumer();

    CreateCommentConsumer();
    UpdateCommentConsumer();
    DeleteCommentConsumer();
    

  } catch (error) {
    if (attempt < maxRetries) {
      attempt++;
      logger.warn(`Retrying Kafka connection (${attempt}/${maxRetries})`);
      setTimeout(connectKafka, 1000 * attempt); // Exponential backoff
    } else {
      logger.error('Error connecting to Kafka:', (error as Error).message);
      
    }
  }
};






export default async function init() {

  try {
    // Connect to the Database 
    await CONNECT_MONGODB();

    // Connecy to Redis
    // app.use((req: Request, res: Response, next: NextFunction) => {
    //   req.redisClient = redisClient;
    //   next();
    // })

    // Connect to Kafka
    await connectKafka();

  } catch (error) {
    logger.error('Error connecting to MongoDB:', (error as Error).message);
    console.error('Error connecting to MongoDB:', (error as Error).message);
  }
}

