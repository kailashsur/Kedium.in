import KafkaConfig from "../../../config/kafka.config";
import Comment from "../../../models/Comments.model";
import logger from "../../../utils/logger";
import { kafka_topics } from "../kafka_topics";

export const UpdateCommentConsumer = async () => {
    const messages: any[] = [];
    let processing = false;
 
    try {
        
        await KafkaConfig.createConsumer('update_comment_consumer_group', [kafka_topics.updateComment], async ({topic, partition, message}) => {

            if(!message.value){
                logger.error("UpdateCommentConsumer()::Received message with undefined value:", message);
                return;
            }
            
            const parsedMessage = JSON.parse(message.value.toString());

            messages.push(parsedMessage);

            if(messages.length > 100 && !processing){
                await processMessages(messages, processing);
            }

            
        })

        setInterval(async () => {
            if(!processing){
                await processMessages(messages, processing);
            }
        }, 5000);

        

    } catch (error) {
        logger.error("Error consuming [update-comment] message", error);
    }
}

const processMessages = async (messages: any[], processing: boolean) => {
    processing = true;

    const batchToProcess = [...messages];
    messages.length = 0;

    try {
        const uniqueComments = await filterUniqueComments(batchToProcess);
        if(uniqueComments.length > 0){
            await updateComments(uniqueComments);
            logger.info("Comments updated successfully");
            
        }
    } catch (error) {
        logger.error("Error processing messages", error);
        messages.push(...batchToProcess);
    } finally {
        processing = false;
    }
}

const filterUniqueComments = async (comments: any[]) => {
    const _ids = comments.map(comment => comment._id);
    const existingComments = await Comment.find({_id : { $in : _ids }});
    const existingCommentIds = new Set(existingComments.map(comment => comment._id));

    return comments.filter(comment => !existingCommentIds.has(comment._id));
}

const updateComments = async (comments: any[]) => {
    try {
        await Comment.updateMany({_id : { $in : comments.map(comment => comment._id)}}, {
            $set : {
                content : comments.map(comment => comment.content)
            }
        })
    } catch (error) {
        logger.error("Error updating comments", error);
    }
}