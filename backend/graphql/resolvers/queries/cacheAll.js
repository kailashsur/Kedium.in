import User from "../../../models/User.js";
import Blog from "../../../models/Blog.js";
import redisClient from "../../../config/redis.js";
import logger from "../../../utils/logger.js";

const RATE_LIMIT_KEY = "cacheAll:rateLimit";

export default async function cacheAll(_, __) {
  const cacheKey = `blogs:`;

  try {
    // Check rate limit
    const isRateLimited = await redisClient.get(RATE_LIMIT_KEY);
    if (isRateLimited) {
      logger.info("Rate limit exceeded. Try again in 1 minute.");
      throw new Error("Rate limit exceeded. Try again in 1 minute.");
    }

    // Fetch data from MongoDB
    const blogs = await Blog.find().lean(); // Use lean for faster query and lean object

    // Cache data asynchronously
    const pipeline = redisClient.pipeline();
    blogs.forEach((blog) => {
      const blogCacheKey = `${cacheKey}blog:${blog.blog_id}`;
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

      pipeline.set(blogCacheKey, blogData, "EX", 3600 * 168);
    });

    await pipeline.exec();

    // Set rate limit key with a 1-minute expiration
    await redisClient.set(RATE_LIMIT_KEY, "true", "EX", 60);

    return blogs; // here blogs is a type of array
  } catch (error) {
    logger.error(`Error fetching blogs: ${error.message}`, error);
  }
}
