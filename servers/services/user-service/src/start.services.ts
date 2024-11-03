import CONNECT_MONGODB from "./config/db";
import seedAdminUser from "./Seeding/seedAdminUser";
import logger from "./utils/logger";
import app from "./app";
import redisClient from "./config/redis.config";
import { NextFunction, Request, Response } from "express";

declare module "express-serve-static-core" {

    export interface Request {
  
      redisClient?: typeof redisClient;
  
    }
  
  }

export default async function init() {


    try {
        await CONNECT_MONGODB();
        seedAdminUser();

        app.use((req: Request, res: Response, next: NextFunction) => {
            req.redisClient = redisClient;
            next();
        })

    } catch (error) {
        logger.error('Error connecting to MongoDB:', (error as Error).message);

    }
}