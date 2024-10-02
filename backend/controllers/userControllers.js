// controllers/userController.js

import redisClient from "../config/redis.js";
import User from "../models/User.js";

class UserClass {
  async getUser(req, res) {
    const user_id = req.user; // "user" is the _id of the user

    try {
      // Check if user data exists in Redis cache
      const cacheUser = await redisClient.get(`users:user:id:${user_id}`);
      if (cacheUser) {
        console.log(
          "Cache hit: from userController:: User data returned from Redis",
        );
        return res.status(200).json({ result: JSON.parse(cacheUser) });
      }

      // If user data not found in cache, fetch from MongoDB
      const user = await User.findById(user_id).select("-__v");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Store user data in Redis cache with a 1-hour expiration
      await redisClient.set(
        `users:user:id:${user_id}`,
        JSON.stringify(user),
        "EX",
        3600,
      );

      return res.status(200).json({ result: user });
    } catch (error) {
      console.error("Server error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateUser(req, res) {
    const toUpdateData = req.body; // Data to be updated, e.g., {fullname, username}
    const user_id = req.user;

    // Ensure the UserAuth cookie is available
    const userAuth = req.cookies.UserAuth;
    if (!userAuth) {
      return res.status(400).json({ error: "UserAuth cookie is missing" });
    }

    try {
      // Update the user data in MongoDB
      const result = await User.updateOne(
        { _id: user_id },
        { $set: toUpdateData },
      );

      if (result.nModified === 0) {
        return res
          .status(404)
          .json({ error: "User not found or no changes made" });
      }

      // Update the UserAuth cookie with new user information
      if (toUpdateData.fullname) {
        userAuth.fullname = toUpdateData.fullname;
      }

      res
        .status(200)
        .cookie("UserAuth", userAuth, {
          httpOnly: true,
          // secure: true, // Uncomment this line if using HTTPS :PRODUCTION
          maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week expiration
        })
        .send("User cookie updated successfully");
    } catch (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

const userControllers = new UserClass();
export default userControllers;
