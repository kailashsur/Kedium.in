// db.js
import mongoose from "mongoose";

const connectDB = async (DATABASE_URI) => {
    try {
        
        await mongoose.connect(DATABASE_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process with failure
    } 
};

export default connectDB;