

/**
 *  Update Blog Producer
 * 
 * This function is responsible for updating a blog post in the database.
 * 
 */

import { Request, Response } from "express";
import { UserType, BlogType } from "kedium-types";
import KafkaConfig from "../../../config/kafka.config";
import { SetBlogCache } from "../../../config/redis.config";
import logger from "../../../utils/logger";
import Blog from "../../../models/Blog.model";
import { kafka_topics } from "../kafka_topics";




/**
 *  Update Blog Producer
 * 
 * 
 */

export default async function UpdateBlogProducer(req : Request, res : Response){


    const user = req.user as UserType;
    const blog = req.blog as BlogType;
    const { 
        slug,
        title,
        thumbnail,
        description,
        content,
        tags,
        category,
        draft
     } = req.blog as BlogType;



    try {
        if(!slug) { 
            return res.status(400).json({ message : 'Please provide a slug to update', data : null }); 
        }


        const isExistBlog = await Blog.findOne({ slug : blog.slug }) as BlogType;

        if(!isExistBlog){
            return res.status(404).json({
                message : 'Blog not found',
                data : null
            })
        }


        if(isExistBlog.author.toString() !== user._id.toString() ){
            return res.status(403).json({
                message : 'You are not authorized to update this blog',
                data : null
            })
        }

        if(!title && !thumbnail && !description && !content && !tags && !category && !draft){
            return res.status(400).json({
                message : 'Please provide atleast one field to update',
                data : null
            })
        }


// update the fields if they are provided
        if(title) isExistBlog.title = title;
        if(thumbnail) isExistBlog.thumbnail = thumbnail;
        if(description) isExistBlog.description = description;
        if(content) isExistBlog.content = content;
        if(tags) isExistBlog.tags = tags;
        if(category) isExistBlog.category = category;
        if(draft) isExistBlog.draft = draft;



        // Update the cache with the updated blog and set expiry to 1 hour
        
        // Produce the updated blog to the kafka topic
        const producer = await KafkaConfig.createProducer();
        producer.send({
            topic : kafka_topics.updateBlog,
            messages : [
                { value : JSON.stringify(isExistBlog) }
            ]
        })
        
        
        SetBlogCache(isExistBlog, 3600);
        
        return res.status(200).json({
            message : 'Blog updated successfully',
            data : isExistBlog
        })
        

    } catch (error) {
        logger.error("Error in UpdateBlogProducer() :: ", error);
    }
}