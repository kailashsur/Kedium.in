// routes/userRoutes.js
import express from "express";
import userControllers from "../controllers/userControllers.js";
import verifyJWT from "../middlewares/authMiddleware.js";
import topicsControllers from "../controllers/topicsController.js";
import FollowController from "../controllers/Follow.controller.js";
import UnfollowController from "../controllers/Unfollow.controller.js";

const userRouter = express.Router();

userRouter.get("/getuser", verifyJWT, userControllers.getUser); // get single user details
userRouter.post("/updateuser", verifyJWT, userControllers.updateUser);
userRouter.post("/topics", verifyJWT, topicsControllers.updateTopics);
userRouter.get("/topics", verifyJWT, topicsControllers.getTopics);
userRouter.get("/follow", verifyJWT, FollowController);
userRouter.get("/unfollow", verifyJWT, UnfollowController);

export default userRouter;
