import CONNECT_MONGODB from "./config/db";
import logger from "./utils/logger";




export default async function init(){


    try {

        await CONNECT_MONGODB();
        
    } catch (error) {
        logger.error('Error connecting to MongoDB:', (error as Error).message);
        console.error('Error connecting to MongoDB:', (error as Error).message);
    }
}