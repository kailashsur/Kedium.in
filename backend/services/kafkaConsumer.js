import Blog from "../models/Blog.js";
import consumer from "../../../config/kafka.js";
import logger from "../../../utils/logger.js";

const runConsumer = async () => {
  await consumer.subscribe({ topic: "like-topic", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const { blogId, userId } = JSON.parse(message.value.toString());

      try {
        // Update the blog like count
        await Blog.findByIdAndUpdate(blogId, { $inc: { likes: 1 } });
        logger.info(`Blog with ID ${blogId} liked by user ${userId}`);
      } catch (error) {
        logger.error(`Error updating like count for blog ${blogId}:`, error);
      }
    },
  });
};

runConsumer().catch((error) =>
  logger.error("Error running Kafka consumer:", error),
);
