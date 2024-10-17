/**
 *  Delete Blog Producer
 *  
 *  
 */

import { Request, Response } from "express";
import { UserType } from "kedium-types";
import KafkaConfig from "../../../config/kafka.config";
import logger from "../../../utils/logger";

import Blog from "../../../models/Blog.model";
import { DeleteBlogCache } from "../../../config/redis.config";
import mongoose from "mongoose";
import { kafka_topics } from "../kafka_topics";



/**
 * Delete Blog Producer Main Function
 * 
 */

export default async function DeleteBlogProducer(req : Request, res : Response){

    const user = req.user as UserType;
    const slug = req.params.slug as string || req.body.slug as string;

    try {
        // Check if the blog exist
        const isExist = await Blog.findOne({ slug : slug });

        if(!isExist){
            return res.status(404).json({
                message : 'Blog not found'
            });
        }

        // Check the author of the blog and the user is same or not, if not return 403, and if the user is Admin then allow to delete the blog

        if(user.role === 'ADMIN'){
            await deleteBlog(isExist._id, slug);
            return res.status(200).json({
                message : 'Blog Deleted Successfully'
            });
        }

        if(isExist.author.toString() !== user._id.toString()){
            return res.status(403).json({
                message : 'You can not delete this blog'
            });
        }

        await deleteBlog(isExist._id, slug);

        return res.status(200).json({
            message : 'Blog Deleted Successfully'
        });


    } catch (error) {
        
        logger.error("Error in DeleteBlogProducer() :: ", error);
        return res.status(500).json({
            message : 'Internal Server Error'
        });
    }

}


async function deleteBlog(_id : mongoose.Types.ObjectId , slug : string){
    try {
        
        const producer = await KafkaConfig.createProducer();

        await producer.send({
            topic : kafka_topics.deleteBlog,
            messages : [
                {
                    value : JSON.stringify({
                        _id : _id,
                        slug : slug
                    })
                }
            ]
        })

        DeleteBlogCache(slug);


    } catch (error) {
        logger.error("Error in deleteBlog() :: ", error);
    }
}