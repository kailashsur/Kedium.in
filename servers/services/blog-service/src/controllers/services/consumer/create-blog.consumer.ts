import KafkaConfig from "../../../config/kafka.config";
import Blog from "../../../models/Blog.model";
import logger from "../../../utils/logger";
import { kafka_topics } from "../kafka_topics";

export const CreateBlogConsumer = async () => {
    const messages: any[] = [];
    let processing = false;


    try {

        await KafkaConfig.createConsumer('create_blog_consumer_group', [kafka_topics.createBlog], async ({ topic, partition, message }) => {

            if (!message.value) {
                logger.error("CreateBlogConsumer()::Received message with undefined value:");
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

        logger.error("Error consuming [create-blog] message", error);
    }


}



async function processMessages(messages: any[], processing: boolean) {
    if (messages.length > 0) {
        processing = true;

        const batchToProcess = [...messages];
        messages.length = 0;

        try {

            const uniqueBlogs = await filterUniqueBlogs(batchToProcess);
            if (uniqueBlogs.length > 0) {
                await Blog.insertMany(uniqueBlogs);
                console.log("Messages saved to database:");
                logger.info("Messages saved to database, bulk insert successfully");
            } 
        } catch (error) {
            logger.error("Error saving messages to database", error);
            messages.push(...batchToProcess);  // Re-add messages to the queue if there was an error
        } finally {
            processing = false;
        }
    }
}

async function filterUniqueBlogs(blogs: any[]) {
    const slugs = blogs.map(blog => blog.slug);
    const existingBlogs = await Blog.find({ slug: { $in: slugs } }).select('slug');
    const existingSlugs = new Set(existingBlogs.map(blog => blog.slug));

    return blogs.filter(blog => !existingSlugs.has(blog.slug));
}

