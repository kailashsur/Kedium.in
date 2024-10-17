import { BlogType } from "kedium-types";
import KafkaConfig from "../../../config/kafka.config";
import Blog from "../../../models/Blog.model";
import logger from "../../../utils/logger";
import mongoose from "mongoose";
import { kafka_topics } from "../kafka_topics";






export const DeleteBlogConsumer = async () =>{

    const messages: mongoose.Types.ObjectId[] = [];

    let processing = false;

    try {
        await KafkaConfig.createConsumer('delete_blog_consumer_group', [kafka_topics.deleteBlog], async ( { topic, partition, message } ) =>{

            if(!message.value){
                logger.error("DeleteBlogConsumer()::Received message with undefined value", );
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
        }, 5000); // save to database bulk insert every 5 seconds

    } catch (error) {
        logger.error("Error Delete-Blog consuming message", error);
    }

}



async function processMessages(messages: mongoose.Types.ObjectId[], processing: boolean){
    if(messages.length > 0){
        processing = true;

        const batchToProcess = [...messages] ;  // output : [ObjectId("60f3b3b3b3b3b3b3b3b3b3b3"), ObjectId("60f3b3b3b3b3b3b3b3b3b3")]
        messages.length = 0;

        try {
            // Perform bulk delete operation
            const response = await Blog.deleteMany({ _id : { $in : batchToProcess } });

            if(!response){
                logger.error("Error in bulk delete-blog operation");
                return;
            }

            logger.info("Bulk Delete-blog operation completed successfully");
            
        } catch (error) {
            logger.error("Error processing Delete-Blog message", error);
        }
    }
}