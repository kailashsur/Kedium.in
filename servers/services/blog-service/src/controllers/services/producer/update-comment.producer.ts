import { Request, Response } from "express";
import KafkaConfig from "../../../config/kafka.config";
import { kafka_topics } from "../kafka_topics";
import { UserType } from "../../../Types";
import Comment from "../../../models/Comments.model";
import Blog from "../../../models/Blog.model";


/**
 *          
 * @param req 
 * @param res 
 * @returns 
 * 
 *  req.body : 
 *  
 */



export default async function UpdateCommentProducer(req: Request, res: Response) {

    const user = req.user as UserType;
    const { _id, content, post_id } = req.body;

    if (!_id || !post_id || content) {
        return res.status(400).json({
            message: "id, post_id are required"
        });
    }

    try {

        const CommentObject = await Comment.findById(_id);

        if (!CommentObject) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        if(CommentObject.author.toString() !== user._id.toString()){
            return res.status(403).json({
                message: "You are not allowed to update this comment"
            });
        }

        const blogObject = await Blog.exists({ _id: post_id });

        if (!blogObject) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        const updatedCommentObject = {
            _id: _id,
            Comment: content,
            post_id: post_id
        }

        // Kafka producer
        const producer = await KafkaConfig.createProducer();
        producer.send({
            topic: kafka_topics.updateComment,
            messages: [
                {
                    value: JSON.stringify(updatedCommentObject)
                }
            ]
        })

        return res.status(200).json({
            message: "Comment updated successfully"
        });



    } catch (error) {

        return res.status(500).json({
            message: "Internal server error"
        });
    }


}   