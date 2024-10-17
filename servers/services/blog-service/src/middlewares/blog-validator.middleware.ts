import { Request, Response, NextFunction } from "express";
import { UserType, BlogType } from "../Types";
import z from "zod";
import { CommentType } from "../models/Comments.model";

declare module 'express-serve-static-core' {
    interface Request {
        blog?: BlogType;
        comment?: CommentType;
    }
}

interface CustomRequest extends Request {
    user?: UserType;
    blog?: BlogType;
    comment?: CommentType;
}

const BlogSchema = z.object({
    slug: z.string().optional(),
    title: z.string().min(5).max(100).optional(),
    thumbnail: z.string().optional(),
    description: z.string().max(200).optional(),
    content: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    author: z.string().optional(),
    activity: z.object({
        likes: z.number().optional(),
        comments: z.number().optional(),
        views: z.number().optional(),
    }).optional(),
    draft: z.boolean().optional(),

});

export default function BlogValidatorMiddleware(req: Request, res: Response, next: NextFunction) {


    let blog = req.body as BlogType;


    try {
        BlogSchema.parse(blog);
    } catch (error) {
        return res.status(400).json({
            message: (error as z.ZodError).errors
        });
    }

    if (!blog?.slug && !blog?.title) {
        return res.status(400).json({
            message: 'Slug and Title is required'
        });
    }

    
    req.blog = blog;


    next();

}


