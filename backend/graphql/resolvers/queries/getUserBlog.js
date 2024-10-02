import User from "../../../models/User.js";
import Blog from "../../../models/Blog.js";
import redisClient from "../../../config/redis.js";
import { setRedisData } from "../../../utils/redis.utils.js";
import logger from "../../../utils/logger.js"; // Assuming you have a logger utility

export default async function getUserBlog(_, { blog_id }, context) {
  // check the user is authenticated or not
  const { user } = context.authorization;
  if (!user) {
    throw new Error("Unauthorized");
  }
  if (user) {
    try {
      const blog = await Blog.findOne({ blog_id, author: user });

      if (!blog) {
        throw new Error(
          "Blog not found, You are not authorized to Edit this blog.",
        );
      }
      return blog;
    } catch (error) {
      logger.error(`Error fetching blogs for user: ${error.message}`);
      throw error;
    }
  }
}
