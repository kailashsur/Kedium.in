import { Request, Response } from "express";
import { UserType } from 'kedium-types';
import KafkaConfig from "../../../config/kafka.config";
import logger from "../../../utils/logger";
import Comment, { CommentType } from "../../../models/Comments.model";
import { kafka_topics } from "../kafka_topics";



export default async function CreateCommentProducer(req : Request, res : Response){

    const user = req.user as UserType;
    const {comment, post_id, parent_id, replies, likes, dislikes} = req.body;

    if(!comment || !post_id){
        return res.status(400).json({
            message : "All fields are required"
        });
    }

    try {
        const newComment = new Comment({
            comment,
            author : user._id,
            post_id,
            parent_id,
            replies,
            likes,
            dislikes
        });

        await newComment.save();

        if(parent_id){
            const parentComment = await Comment.findById(parent_id);
            if(parentComment){
                parentComment.replies.push(newComment._id);
                await parentComment.save();
            }
        }

        
        // kafka producer
        const producer = await KafkaConfig.createProducer();
        producer.send({
            topic : kafka_topics.createComment,
            messages : [
                {
                    value : JSON.stringify(newComment)
                }
            ]
        })

        return res.status(200).json({
            message : "Comment created successfully",
            data : newComment
        });


    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            message : "Internal Server Error"
        });
    }








    
    

}