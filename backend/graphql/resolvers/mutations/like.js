import Blog from "../../../models/Blog.js";
import { producer } from "../../../config/kafka.js";

export const like = async (_, { blogId }, context) => {
  try {
    // Produce a message to Kafka
    await producer.send({
      topic: "like-topic",
      messages: [
        { value: JSON.stringify({ blogId, userId: context.user.id }) }, // Include userId if needed
      ],
    });
    return { success: true, message: "Like recorded" };
  } catch (error) {
    console.error("Error producing Kafka message:", error);
    return { success: false, message: "Error recording like" };
  }
};
