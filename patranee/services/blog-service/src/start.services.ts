import app from "./app";
import CONNECT_MONGODB from "./config/db.config";
import redisClient from "./config/redis.config";
import logger from "./utils/logger";
import { NextFunction, Request, Response } from "express";



declare module "express-serve-static-core" {

  export interface Request {

    redisClient?: typeof redisClient;

  }

}



export default async function init(){


    try {
        // Connect to the Database 
        await CONNECT_MONGODB();

        // Connecy to Redis
        app.use((req : Request , res : Response , next : NextFunction)=>{
            req.redisClient = redisClient;
            next();
        })
        
    } catch (error) {
        logger.error('Error connecting to MongoDB:', (error as Error).message);
        console.error('Error connecting to MongoDB:', (error as Error).message);
    }
}