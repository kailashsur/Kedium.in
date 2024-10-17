import { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";



const CommentLimiter = rateLimit({
    windowMs: 10 * 1000, // 10s
    max: 5, // 5 comment per 10s
    message: "Too many Comment, please wait for 30 seconds.",
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    handler: (req : Request, res : Response, next : NextFunction) => {
        res.status(429).json({
            message : "Too many comment, please wait for 30 seconds."
        })
    }
});

export default CommentLimiter;