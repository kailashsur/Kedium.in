// routes/userRoutes.js
import express from "express";
import userControllers from "../controllers/userControllers.js"
import verifyJWT from "../middlewares/authMiddleware.js";
import topicsControllers from "../controllers/topicsController.js";

const userRouter = express.Router();

userRouter.get("/getuser", verifyJWT, userControllers.getUser); // get single user details
userRouter.post("/updateuser", verifyJWT, userControllers.updateUser);
userRouter.post("/topics", verifyJWT, topicsControllers.updateTopics )
userRouter.get("/topics", verifyJWT, topicsControllers.getTopics )

export default userRouter
