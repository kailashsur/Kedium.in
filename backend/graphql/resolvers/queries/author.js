import User from "../../../models/User.js";
import redisClient from "../../../config/redis.js";
import logger from "../../../utils/logger.js"; // Assuming you have a logger utility

/*
 * Fetch author details from MongoDB
 * @param {Object} blog - Blog object
 * @returns {Promise<Object>} - Author details
 */

export const authorfunc = async (blog) => {
  const cacheKey = `blogs:author:${blog.author}`;

  try {
    // Fetch author from Redis
    const cachedAuthor = await redisClient.get(cacheKey);
    if (cachedAuthor) {
      logger.info("Return author from Redis");
      return JSON.parse(cachedAuthor);
    }

    // Fetch author from MongoDB
    const user = await User.findById(blog.author).lean(); // Use lean for faster query and lean object
    if (!user) {
      const errorMessage = `User with ID ${blog.author} not found`;
      logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    // Cache author data asynchronously
    redisClient
      .set(cacheKey, JSON.stringify(user), "EX", 3600 * 168)
      .catch((cacheError) => {
        logger.error(`Error caching author data: ${cacheError.message}`);
      });

    logger.info("Return author from MongoDB");
    return user;
  } catch (error) {
    logger.error(`Error fetching author: ${error.message}`, error);
    throw new Error("Failed to fetch author");
  }
};
