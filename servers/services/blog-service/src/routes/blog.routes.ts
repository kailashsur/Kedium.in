import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";

import BlogValidatorMiddleware from "../middlewares/blog-validator.middleware";
import CreateBlogProducer from "../controllers/services/producer/create-blog.producer";
import UpdateBlogProducer from "../controllers/services/producer/update-blog.producer";
import DeleteBlogProducer from "../controllers/services/producer/delete-blog.producer";
import { LikeBlogController } from "../controllers/blogs_controller/like-blog.controller";
import likePostLimiter from "../middlewares/like-limiter.middleware";
import { UnlikeBlogController } from "../controllers/blogs_controller/unlike-blog.controller";
import CreateCommentProducer from "../controllers/services/producer/create-comment.producer";
import UpdateCommentProducer from "../controllers/services/producer/update-comment.producer";
import CommentLimiter from "../middlewares/comment-limiter.middleware";
import DeleteCommentProducer from "../controllers/services/producer/delete-comment.producer";


// Search Blogs
import searchBlogController from "../controllers/search/searchBlog.controller";

const blog_router = Router();



blog_router.route('/create-blog').post(verifyJWT, BlogValidatorMiddleware, CreateBlogProducer);
blog_router.route('/update-blog').put(verifyJWT, BlogValidatorMiddleware, UpdateBlogProducer);
blog_router.route('/delete-blog').delete(verifyJWT, DeleteBlogProducer); // take params as slug // can delete blog only admin developer



/**
 * All the Get Routes are below, 
 * But, all the get routes are served by graphql
 * 
 */

// blog_router.route('/get-blog/:slug').get(verifyJWT, GetPostController); // Get a single blog by its slug
// blog_router.route('/get-user-blogs').get(verifyJWT, GetUserBlogsController); // Get blogs for the authenticated user
// blog_router.route('/search-blogs').get(verifyJWT, SearchBlogsController); // Search blogs by title, content, or tags

// Like and Unlike Routes
blog_router.route('/like-blog/:slug').put(verifyJWT, likePostLimiter, LikeBlogController); // Like a blog
blog_router.route('/unlike-blog/:slug').post(verifyJWT, likePostLimiter, UnlikeBlogController); // Unlike a blog

// Comment Routes
blog_router.route('/create-comment').post(verifyJWT, CommentLimiter, CreateCommentProducer); // Add a comment to a blog
blog_router.route('/update-comment').put(verifyJWT, CommentLimiter, UpdateCommentProducer); // Update a comment
blog_router.route('/delete-comment/:_id/:post_id').delete(verifyJWT, CommentLimiter, DeleteCommentProducer); // Delete a comment from a blog

// Search Blogs with elastic search
blog_router.route('/search-blogs').get(searchBlogController.searchBlogs);


blog_router.route('/kafka/connect').get(verifyJWT); // can connect to kafka only admin developer
blog_router.route('/kafka/disconnect').get(verifyJWT); // can disconnect to kafka only admin developer

export default blog_router;