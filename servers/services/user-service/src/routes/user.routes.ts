import { Router } from "express";
import { FollowUser, UnfollowUser, GetUser, GetUsers, UpdateUser, DeleteUser } from "../controllers";

import { verifyJWT } from "../middlewares/auth.middleware";


/**
 * 
 * @description User Routes
 * @file user.routes.ts
 * @module user.route.ts
 * @version 0.0.1
 */




/**
 * Define the user router
 */
const user_router = Router();

/**
 * Defineing all the routes
 */

// * Follow and Unfollow
user_router.route('/decode-token').get(verifyJWT, (req, res) => {
    res.status(200).json({ message: "Token is valid", user: req.user });
});
user_router.route('/follow').post(verifyJWT, FollowUser);
user_router.route('/unfollow').post(verifyJWT, UnfollowUser);

user_router.route('/get-user').get(GetUser);
user_router.route('/get-users').get(GetUsers);

// PUT Request
user_router.route('/update-user').put(verifyJWT, UpdateUser);

user_router.route("/delete-user").delete(verifyJWT, DeleteUser);


/**
 * Export the router
 */
export default user_router;