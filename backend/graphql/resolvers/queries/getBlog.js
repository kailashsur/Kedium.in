import User from "../../../models/User.js";
import Blog from "../../../models/Blog.js";
import redisClient from "../../../config/redis.js";
import { setRedisData } from "../../../utils/redis.utils.js";
import logger from "../../../utils/logger.js"; // Assuming you have a logger utility

export default async function getBlog(_, { blog_id }) {
  const cacheKey = `blogs:blog:${blog_id}`;
  try {
    // Fetch blog from cache
    const cachedBlog = await redisClient.get(cacheKey);
    if (cachedBlog) {
      logger.info(`Returning blog from cache with id ${blog_id}`);
      return JSON.parse(cachedBlog);
    }

    // If the blog is not found in cache, fetch from MongoDB
    const blog = await Blog.findOne({ blog_id }).lean(); // Use lean for better performance
    if (!blog) {
      const errorMessage = `Blog with ID ${blog_id} not found`;
      logger.error(errorMessage);
      // throw new Error(errorMessage);
    }

    const blogData = JSON.stringify({
      _id: blog._id,
      blog_id: blog.blog_id,
      title: blog.title,
      thambnail: blog.thambnail,
      tags: blog.tags,
      publishedAt: blog.publishedAt,
      draft: blog.draft,
      description: blog.description,
      updatedAt: blog.updatedAt,
      author: blog.author,
      content: blog.content,
    });

    // Cache data asynchronously
    setRedisData(cacheKey, blogData, 3600 * 168).catch((error) => {
      logger.error(`Error setting data in cache for key ${cacheKey}:`, error);
    });

    return blog;
  } catch (error) {
    logger.error("Error fetching blog:", error);
    // throw new Error("Error fetching blog");
  }
}
