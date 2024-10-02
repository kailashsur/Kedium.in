import User from "../../../models/User.js";
import Blog from "../../../models/Blog.js";
import redisClient from "../../../config/redis.js";
import { setRedisData } from "../../../utils/redis.utils.js";
import logger from "../../../utils/logger.js"; // Assuming you have a logger utility

export default async function getUserBlogs(_, { username }, context) {
  // check the user is authenticated or not
  const { user } = context.authorization;
  if (!user) {
    throw new Error("Unauthorized");
  }
  if (user) {
    try {
      const blogs = await Blog.find({ author: user });
      return blogs;
    } catch (error) {
      logger.error(`Error fetching blogs for user: ${error.message}`);
      throw new Error("Failed to fetch blogs");
    }
  }
}
