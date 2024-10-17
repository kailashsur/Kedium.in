/**
 *  Delete Comment Producer
 * 
 * 
 */

import { Request, Response } from "express";
import { UserType } from "kedium-types";
import KafkaConfig from "../../../config/kafka.config";
import logger from "../../../utils/logger";
import Comment from "../../../models/Comments.model";
import { kafka_topics } from "../kafka_topics";




export default async function DeleteCommentProducer(req: Request, res: Response) {

    
    const user = req.user as UserType;
    const { _id, post_id } = req.params;
    


    if (!_id || !post_id) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    try {
        try {
            const commentObject = await Comment.findById(_id);

            if(!commentObject){
                return res.status(404).json({
                    message : "Comment not found"
                });
            }

            if(commentObject.author.toString() !== user._id.toString()){
             
                return res.status(403).json({
                    message : "You are not allowed to delete this comment"
                });
            }

            const producer = await KafkaConfig.createProducer();
            producer.send({
                topic : kafka_topics.deleteComment,
                messages : [
                    {
                        value : JSON.stringify({
                            _id,
                            post_id
                        })
                    }
                ]
            })

            return res.status(200).json({
                message : "Comment deleted successfully"
            });


        } catch (error) {
            logger.error("Error deleting comment", error);
            return res.status(500).json({
                message: "Internal server error"
            });
        }
    } catch (error) {
        logger.error("Error deleting comment", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
