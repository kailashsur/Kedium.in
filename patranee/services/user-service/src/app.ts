// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import passport from "passport";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./utils/errorHandlers";
import cors from 'cors';
import cookieParser from "cookie-parser";
import auth_router from "./routes/auth.routes";
import CONNECT_MONGODB from "./config/db";
import user_router from "./routes/user.routes";
import init from "./start.services";






/**
 * Initialize Express
 */
const app = express();
const PORT = process.env.PORT || 4000;


/**
 * Http headers security
 * 
 *  */
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))
app.use(express.json({ limit: '16kb' }));   // Body limit is 16kb 
app.use(express.urlencoded({ extended: true, limit: '16kb' }));     // Body limit is 16kb
app.use(express.static('public'));  // To serve static files
app.use(passport.initialize());
app.use(cookieParser());
app.use(helmet());


/**
 * Rate limiting
 */
app.use(rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}))

/**
 * Connect to MongoDB
 */

init();


/**
 * Routes
 */
app.get('/', (req, res) => {
    res.status(200).json({message : 'App is running'});
});
//--- Router import
app.use('/api/v1/auth',auth_router);
app.use('/api/v1', user_router);





/**
 * Google OAuth
 */


/**
 * Error handling
 */

app.use(errorHandler);


export default app;
/**
 * Start Server
 */

