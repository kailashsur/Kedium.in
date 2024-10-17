import mongoose from "mongoose";
import 'dotenv/config'
import { ConnectOptions } from "mongoose";

const CONNECT_MONGODB = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI || ''
        );
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', (error as Error).message);
        process.exit(1); // Exit process with failure
    }
};

export default CONNECT_MONGODB;