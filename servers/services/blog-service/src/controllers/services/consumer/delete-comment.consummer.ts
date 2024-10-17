import KafkaConfig from "../../../config/kafka.config";
import Comment from "../../../models/Comments.model";
import logger from "../../../utils/logger";
import { kafka_topics } from "../kafka_topics";

export const DeleteCommentConsumer = async () => {
    const messages: any[] = [];
    let processing = false;
 
    try {
    
        await KafkaConfig.createConsumer('delete_comment_consumer_group', [kafka_topics.deleteComment], async ({topic, partition, message}) => {

            if(!message.value){
                logger.error("DeleteCommentConsumer()::Received message with undefined value:", message);
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
        logger.error("Error consuming [delete-comment] message", error);
    }
    
}

async function processMessages(messages: any[], processing: boolean){
    if(messages.length > 0){
        processing = true;

        const batchToProcess = [...messages];
        messages.length = 0;

        try {
            await Comment.deleteMany({_id: {$in: batchToProcess.map(msg => msg._id)}});
            
            
            logger.info("Comment deleted successfully");
        } catch (error) {
            logger.error("Error deleting comment", error);
            messages.push(...batchToProcess);
        } finally {
            processing = false;
        }
    }
}