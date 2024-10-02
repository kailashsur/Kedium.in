import Blog from "../../../models/Blog.js";
import redisClient from "../../../config/redis.js";

export const total_reads = async (_, { blog_id }, { authorization }) => {
  const user_id = authorization?.user;
  const likesKey = `blogs:activity:${blog_id}:total_reads`;

  if (user_id) {
    const newTotalLikes = await redisClient.incr(likesKey);

    return "visited!";
  }
  return new Error("Unauthorized");
};
