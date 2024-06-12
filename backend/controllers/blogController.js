class BlogClass {
  async createBlog(req, res) {
    const user = req.user; // here user is a id of user

    const blog = req.body;

    return res.status(200).json({ message: "success", user, blog });
  }
}

const blogController = new BlogClass();
export default blogController;
