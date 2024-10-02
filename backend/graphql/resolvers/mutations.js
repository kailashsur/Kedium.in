import User from "../../models/User.js";
import Blog from "../../models/Blog.js";
import redisClient from "../../config/redis.js";
import { setRedisData } from "../../utils/redis.utils.js";
import { createBlog } from "./mutations/createBlog.js";
import { like } from "./mutations/like.js";
import { total_reads } from "./mutations/total_reads.js";
import { updateBlog } from "./mutations/updateBlog.js";

const mutation = {
  createBlog: createBlog,
  updateBlog: updateBlog,
  deleteBlog: async (_, { blog_id }) => {
    return await Blog.findOneAndDelete({ blog_id });
  },

  like: like,
  total_reads: total_reads,
};

export default mutation;
