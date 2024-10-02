import getBlog from "./queries/getBlog.js";
import getBlogs from "./queries/getBlogs.js";
import cacheAll from "./queries/cacheAll.js";
import getUserBlogs from "./queries/getUserBlogs.js";
import getUserBlog from "./queries/getUserBlog.js";
import getUser from "./queries/getUser.js";

// All the queries methods are called here
const query = {
  getBlog,
  getBlogs,
  cacheAll,
  getUser,
  getUserBlogs,
  getUserBlog,
};

export default query;
