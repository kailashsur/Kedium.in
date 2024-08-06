import Blog from "../../../models/Blog.js";
import redisClient from "../../../config/redis.js";
/*
 * Fetch activity details from MongoDB
 * @param {Object} blog - Blog object
 * @returns {Promise<Object>} - Activity details
 */

export const activityfunc = async (blog) => {
  try {
    // Fetch activity from Redis
    const cacheKey = `blogs:activity:${blog.blog_id}`;
    const cachedActivity = await redisClient.get(cacheKey);

    if (cachedActivity) {
      console.log("Return activity from Redis");
      return JSON.parse(cachedActivity);
    }

    // Fetch activity from MongoDB
    const blogData = await Blog.findById(blog._id, "activity");
    const { activity } = blogData;

    try {
      await redisClient.set(cacheKey, JSON.stringify(activity));
    } catch (cacheError) {
      console.error(`Error caching activity data: ${cacheError.message}`);
    }

    console.log("Return activity from MongoDB");
    return activity;
  } catch (error) {
    console.error(`Error fetching activity: ${error.message}`);
    throw new Error("Failed to fetch activity");
  }
};
