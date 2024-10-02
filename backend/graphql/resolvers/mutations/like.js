import Blog from "../../../models/Blog.js";
import redisClient from "../../../config/redis.js";

export const like = async (_, { blog_id }, { authorization }) => {
  const user_id = authorization?.user;
  const likesKey = `blogs:activity:${blog_id}:total_likes`;

  if (user_id) {
    const newTotalLikes = await redisClient.incr(likesKey);

    return "Liked!";
  }
  return new Error("Unauthorized");
};
