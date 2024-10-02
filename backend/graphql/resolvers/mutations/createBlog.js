import User from "../../../models/User.js";
import Blog from "../../../models/Blog.js";
import redisClient from "../../../config/redis.js";
import { setRedisData } from "../../../utils/redis.utils.js";

export const createBlog = async (_, args, context) => {
  const { user } = context.authorization;

  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    const user_data = await User.findById(user);
    if (!user_data) {
      throw new Error("User not found");
    }

    const blog = new Blog({ ...args, author: user_data._id });

    // Combined update operations
    await User.updateOne(
      { _id: user_data._id },
      {
        $inc: { total_posts: 1 },
        $push: { blogs: blog._id },
      }
    );

    const savedBlog = await blog.save();

    const cacheKey = `blogs:blog:${savedBlog.blog_id}`;

    const blogData = JSON.stringify({
      _id: savedBlog._id,
      blog_id: savedBlog.blog_id,
      title: savedBlog.title,
      thambnail: savedBlog.thambnail,
      tags: savedBlog.tags,
      publishedAt: savedBlog.publishedAt,
      draft: savedBlog.draft,
      description: savedBlog.description,
      updatedAt: savedBlog.updatedAt,
      author: savedBlog.author,
      content: savedBlog.content,
    });

    // Cache data asynchronously
    (async () => {
      try {
        await setRedisData(cacheKey, blogData, 3600 * 24);
      } catch (error) {
        console.error(
          `Error setting data in cache for key ${cacheKey}:`,
          error
        );
      }
    })();

    return savedBlog;
  } catch (error) {
    console.error(`Error creating blog: ${error.message}`);
    throw new Error("Failed to create blog");
  }
};
