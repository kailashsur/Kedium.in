// routes/userRoutes.js
import express from "express";
import verifyJWT from "../middlewares/authMiddleware.js";
import blogController from "../controllers/blogController.js";

const blogRouter = express.Router();

blogRouter.post("/create-blog", verifyJWT, blogController.createBlog);


export default blogRouter
