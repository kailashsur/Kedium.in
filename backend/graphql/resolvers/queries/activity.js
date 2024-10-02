import Blog from "../../../models/Blog.js";
import redisClient from "../../../config/redis.js";

/**
 * Fetch activity details from MongoDB or Redis cache.
 * @param {Object} blog - Blog object
 * @returns {Promise<Object>} - Activity details
 */
export const activityfunc = async (blog) => {
  const baseCacheKey = `blogs:activity:${blog.blog_id}`;

  try {
    // Check if individual activity metrics are cached in Redis
    const [likes, comments, reads] = await Promise.all([
      redisClient.get(`${baseCacheKey}:total_likes`),
      redisClient.get(`${baseCacheKey}:total_comments`),
      redisClient.get(`${baseCacheKey}:total_reads`),
    ]);

    if (likes && comments && reads) {
      console.log("Return activity from Redis");
      return {
        total_likes: parseInt(likes, 10),
        total_comments: parseInt(comments, 10),
        total_reads: parseInt(reads, 10),
      };
    }

    // Fetch activity from MongoDB
    const blogData = await Blog.findById(blog._id, "activity").lean();
    if (!blogData || !blogData.activity) {
      throw new Error(`No activity data found for blog with ID: ${blog._id}`);
    }

    const { total_likes, total_comments, total_reads } = blogData.activity;

    // Cache individual activity metrics in Redis
    await Promise.all([
      redisClient.set(`${baseCacheKey}:total_likes`, total_likes),
      redisClient.set(`${baseCacheKey}:total_comments`, total_comments),
      redisClient.set(`${baseCacheKey}:total_reads`, total_reads),
    ]).catch((cacheError) => {
      console.error(`Error caching activity data: ${cacheError.message}`);
    });

    console.log("Return activity from MongoDB");
    return { total_likes, total_comments, total_reads };
  } catch (error) {
    console.error(`Error fetching activity: ${error.message}`);
    throw new Error("Failed to fetch activity");
  }
};
