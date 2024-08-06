import User from "../../models/User.js";
import Blog from "../../models/Blog.js";
import redisClient from "../../config/redis.js";
import { setRedisData } from "../../utils/redis.utils.js";
import { createBlog } from "./mutations/createBlog.js";

const mutation = {
  createBlog: createBlog,
  updateBlog: async (_, { blog_id, ...updateFields }) => {
    return await Blog.findOneAndUpdate({ blog_id }, updateFields, {
      new: true,
    });
  },
  deleteBlog: async (_, { blog_id }) => {
    return await Blog.findOneAndDelete({ blog_id });
  },
};

export default mutation;
