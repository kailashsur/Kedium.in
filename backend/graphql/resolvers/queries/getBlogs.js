import User from "../../../models/User.js";
import Blog from "../../../models/Blog.js";
import redisClient from "../../../config/redis.js";
import { setRedisData } from "../../../utils/redis.utils.js";
import logger from "../../../utils/logger.js"; // Assuming you have a logger utility

export default async function getBlogs(_, __) {
  const cacheKey = `blogs:`;

  try {
    // Fetch data from cache redis
    const cacheKeys = await redisClient.keys(`${cacheKey}blog:*`);
    if (cacheKeys.length > 0) {
      const pipeline = redisClient.pipeline();
      cacheKeys.forEach((key) => pipeline.get(key));
      const results = await pipeline.exec();
      const cacheData = results.map(([err, data]) => JSON.parse(data));

      if (cacheData.length > 0) {
        return cacheData;
      }
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

    return blogs; // here blogs is a type of array
  } catch (error) {
    logger.error(`Error fetching blogs: ${error.message}`, error);
    throw new Error("Unable to fetch blogs");
  }
}
