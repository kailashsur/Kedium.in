import { BlogType } from "kedium-types";
import KafkaConfig from "../../../config/kafka.config";
import Blog from "../../../models/Blog.model";
import logger from "../../../utils/logger";
import { kafka_topics } from "../kafka_topics";




export const UpdateBlogConsumer = async () =>{


    const messages: any[] = [];
    let processing = false;


    try {
      
        await KafkaConfig.createConsumer('update_blog_consumer_group', [kafka_topics.updateBlog], async ({ topic, partition, message }) => {

            if (!message.value) {
                logger.error("updateConsumer()::Received message with undefined value");
                return;
            }

            const parsedMessage = JSON.parse(message.value.toString());

            messages.push(parsedMessage);

            if (messages.length > 100 && !processing) {
                await processMessages(messages, processing);
            }


        })


        setInterval(async () => {
            if (!processing) {
                await processMessages(messages, processing);
            }
        }, 5000);  // save to database bulk insert every 5 seconds

    } catch (error) {
        logger.error("Error consuming message", error);
    }

}

async function processMessages(messages: any[], processing: boolean){
    if(messages.length > 0){
        processing = true;

        const batchToProcess = [...messages] ;
        messages.length = 0;

        try {
            
            const bulkOperations = batchToProcess.map((blog) => {
                const updateFields : Partial<BlogType> = {};

                if(blog.title) updateFields.title = blog.title;
                if(blog.thumbnail) updateFields.thumbnail = blog.thumbnail;
                if(blog.description) updateFields.description = blog.description;
                if(blog.content) updateFields.content = blog.content;
                if(blog.tags) updateFields.tags = blog.tags;
                if(blog.category) updateFields.category = blog.category;
                if(blog.draft) updateFields.draft = blog.draft;

                return {
                    updateOne: {
                        filter: { slug: blog.slug },
                        update: updateFields
                    }
                }
            });

            await Blog.bulkWrite(bulkOperations);

            console.log("Messages saved to database, bulk insert successfully", batchToProcess);

        } catch (error) {
            logger.error("Error saving messages to database", error);
        }
    }
}