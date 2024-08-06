import User from "../../models/User.js";
import Blog from "../../models/Blog.js";
import getBlog from "./queries/getBlog.js";
import getBlogs from "./queries/getBlogs.js";
import cacheAll from "./queries/cacheAll.js";

// All the queries methods are called here
const query = {
  getBlog,
  getBlogs,
  cacheAll,
};

export default query;
