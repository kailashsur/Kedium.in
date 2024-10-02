import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/errorHandlers';
import { UserType } from '../../Types';
import mongoose from 'mongoose';
import { validate_email } from '../../utils/validators';
import User from '../../models/user.model';
import Follow from '../../models/follow.model';
import { startSession } from 'mongoose';

/**
 * 
 */

export const UnfollowUser = asyncHandler(async (req: Request, res: Response) => {

    /**
     * Get the current user
     */

    const current_user = req.user as UserType;
    const { username, email } = req.body as { username: string, email: string };

    
    /**
     * Validate the request
     */

    if (!username && !email) {
        return res.status(400).json({ message: 'Invalid request' });
    }

    if (username && String(username).length < 3) {
        return res.status(400).json({ message: 'Invalid username' });
    }

    if(username === current_user.username){
        return res.status(400).json({ message : 'You cannot unfollow yourself'});
    }
    if (email && !validate_email(email)) {
        return res.status(400).json({ message: 'Invalid email' });
    }

    try {

        /**
        * Check the user is available in db or not
        */

        const target_user = await User.findOne({
            $or : [{ username }, { email }]
        });

        /**
         * If the user is not available
         */

        if (!target_user) {
            return res.status(404).json({ message: 'The user, you are trying to unfollow is not available' });
        }

        /**
         * Use aggregation pipeline to check if the current user is already following the target user
         */

        const result = await Follow.aggregate([
            {
                $match : {
                    user_is : { $in : [current_user._id, target_user._id] }
                }
            },
            {
                $facet : {
                    currentUserFollowing : [
                        { $match : { user_id : current_user._id } },
                        { $project : { isFollowing : { $in : [target_user._id, '$following'] } } }
                    ],
                    targetUserFollowers : [
                        { $match : { user_id : target_user._id } },
                        { $project : { isFollower : { $in : [current_user._id, '$followers'] } } }
                    ]
                }
            }
        ]);

        /**
         * If the current user is not following the target user
         */

        if(result[0].currentUserFollowing[0]?.isFollowing === false){
            return res.status(400).json({ message : `You are not following @${target_user.username}`});
        }

        if(result[0].targetUserFollowers[0]?.isFollower === false){
            return res.status(400).json({ message : `You are not following @${target_user.username}`});
        }

      
         /**
             * Unfollow the user
             */
        

        await Follow.updateOne(
            { user_id: target_user._id },
            { $pull: { followers: current_user._id }, $inc: { followers_count: -1 } },
        );

        await Follow.updateOne(
            { user_id: current_user._id },
            { $pull: { following: target_user._id }, $inc: { following_count: -1 } },
        );


        return res.status(200).json({ message: `You unfollowed successfully to @${target_user.username}` });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});