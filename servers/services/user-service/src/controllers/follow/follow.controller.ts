import { Request, Response } from "express";
import { FollowType, UserType } from "../../Types";
import { asyncHandler } from "../../utils/errorHandlers";
import mongoose from "mongoose";
import { validate_email } from "../../utils/validators";
import User from "../../models/user.model";
import Follow from "../../models/follow.model";
import { startSession } from "mongoose";
import { isStringObject } from "util/types";
import logger from "../../utils/logger";

/**
 * @api {post} /follow Follow a user
 * @apiName FollowUser
 * @apiGroup Follow
 * @apiPermission user
 * 
 * @apiBody {string} username The username of the user to follow
 * @apiBody {string} email The email of the user to follow
 * 
 * @apiSuccess {string} message Success message
 * 
 * @apiError {400} InvalidRequest The request is invalid
 * @apiError {404} UserNotFound The user to follow is not found
 * @apiError {500} InternalServerError An internal server error occurred
 * 
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Promise<Response>} The response object
 */





export const FollowUser = asyncHandler(async (req: Request, res: Response) => {
    /**
     * [step 1] Get the current user
     */
    const current_user = req.user as UserType;
    const { username, email } = req.body as { username: string, email: string };

    /**
     * [step 2] Validate the request
     */
    if (!username && !email) {
        return res.status(400).json({ message: "Invalid request" });
    }

    if (email && !validate_email(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }

    try {
        /**
         * Check the user is available in db or not
         */
        const target_user = await User.findOne({
            $or: [{ username }, { email }]
        });

        /**
         * If the user is not available
         */
        if (!target_user) {
            return res.status(404).json({ message: "The user, you are trying to follow is not available" });
        }

        /**
         * Use aggregation pipeline to check if the current user is already following the target user
         */
        const result = await Follow.aggregate([
            {
                $match: {
                    user_id: { $in: [current_user._id, target_user._id] }
                }
            },
            {
                $facet: {
                    currentUserFollowing: [
                        { $match: { user_id: current_user._id } },
                        { $project: { isFollowing: { $in: [target_user._id, "$following"] } } }
                    ],
                    targetUserFollowers: [
                        { $match: { user_id: target_user._id } },
                        { $project: { isFollower: { $in: [current_user._id, "$followers"] } } }
                    ]
                }
            }
        ]);

        const currentUserFollowing = result[0].currentUserFollowing[0]?.isFollowing;
        const targetUserFollowers = result[0].targetUserFollowers[0]?.isFollower;

        if (currentUserFollowing || targetUserFollowers) {
            return res.status(400).json({ message: "You are already following the user" });
        }

        /**
        * Update the current user follow document
        */
        await Follow.findOneAndUpdate(
            { user_id: current_user._id },
            {
                $addToSet: { following: target_user._id },
                $inc: { following_count: 1 }
            },
            { new: true, upsert: true }
        );

        /**
         * Update the target user follow document
         */
        await Follow.findOneAndUpdate(
            { user_id: target_user._id },
            {
                $addToSet: { followers: current_user._id },
                $inc: { followers_count: 1 }
            },
            { new: true, upsert: true }
        );


        return res.status(200).json({ message: `You are now following @${target_user.username}` });

    } catch (error) {
        logger.error("An error occurred in FollowUser: ", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
});



