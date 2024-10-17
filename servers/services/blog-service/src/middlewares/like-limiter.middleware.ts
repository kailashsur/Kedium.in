import { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";



const likePostLimiter = rateLimit({
    windowMs: 10 * 1000, // 10s
    max: 5, // 5 likes per 10s
    message: "Too many likes, please wait for 30 seconds.",
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    handler: (req : Request, res : Response, next : NextFunction) => {
        res.status(429).json({
            message : "Too many likes, please wait for 30 seconds."
        })
    }
});

export default likePostLimiter;