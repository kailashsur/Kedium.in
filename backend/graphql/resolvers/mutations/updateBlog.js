import User from "../../../models/User.js";
import Blog from "../../../models/Blog.js";
import redisClient from "../../../config/redis.js";
import { setRedisData } from "../../../utils/redis.utils.js";

export const updateBlog = async (_, { blog_id, ...updateFields }, context) => {
  const { user } = context.authorization;

  // check the user is authenticated or not
  if (!user) {
    throw new Error("Unauthorized");
  }

  // Check the user is valid or not
  if (user) {
    const user_data = await User.findById(user);
    if (!user_data) {
      throw new Error("User not found");
    }
  }

  // check the user is authenticated or not
  const blog_verify = await Blog.findOne({ blog_id, author: user });
  if (!blog_verify) {
    throw new Error(
      "Blog not found, You are not authorized to Edit this blog.",
    );
  }

  // Update the blog
  try {
    const blog = await Blog.findOneAndUpdate({ blog_id }, updateFields, {
      new: true,
    });

    const cacheKey = `blogs:blog:${blog.blog_id}`;

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
    setRedisData(cacheKey, blogData, 3600 * 24).catch((error) => {
      logger.error(`Error setting data in cache for key ${cacheKey}:`, error);
    });

    return blog;
  } catch (error) {
    console.error(`Error updating blog: ${error.message}`);
    throw new Error("Failed to update blog");
  }
};
