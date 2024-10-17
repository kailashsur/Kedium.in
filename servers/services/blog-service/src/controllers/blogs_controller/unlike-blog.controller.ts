
import { Request, Response } from "express";
import Blog from "../../models/Blog.model";
import Activity from "../../models/Activity.model";
import { UserType } from "kedium-types";
import logger from "../../utils/logger";


export const UnlikeBlogController = async (req : Request, res : Response) => {

    const { slug } = req.params || req.body || req.query;

    const user = req.user as UserType;

    if(!slug){
        return res.status(400).json({
            message : "Slug is required"
        })
    }

    if(!user){
        return res.status(401).json({
            message : "Unauthorized"
        })
    }

    try {

        const blog = await Blog.exists({ slug : slug });

        if(!blog){
            return res.status(404).json({
                message : "Blog not found"
            })
        }

        const isLiked = await Activity.exists({ post_id : blog._id, slug : slug, likes : { $in : [user._id] } });

        if(!isLiked){
            return res.status(400).json({
                message : "Not liked"
            })
        }

        await Activity.updateOne({ $or : [{ post_id : blog._id }, { slug : slug }] }, { $pull : { likes : user._id } });

        return res.status(200).json({
            message : "Unliked"
        })
    }
    catch(err){
        logger.error(err);
        return res.status(500).json({
            message : "Internal server error"
        })
    }
        
    
}