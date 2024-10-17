import { Request, Response } from "express";
import { z } from "zod";
import logger from "../../utils/logger";
import User from "../../models/user.model";
import { UserType } from "../../Types";

/**
 * @api {put} /api/user/update Update User
 * @apiName Update User
 * @apiGroup User
 * @apiVersion  0.0.1
 * @request data
 * @requestExample {json} Request-Example: 
 * {
 *    "username": "new_username",
 *    "email": "new_email@example.com",
 *    "fullname": "New Fullname",
 *    "profile_img": "https://example.com/image.jpg",
 *    "bio": "New Bio",
 *    "website": "https://example.com",
 *    "youtube": "https://youtube.com",
 *    "instagram": "https://instagram.com",
 *    "facebook": "https://facebook.com",
 *    "x": "https://x.com"
 * }
 * @apiSuccess (200) {json} User Updated User
 * @apiError (400) {json} UserError Bad Request
 * @apiError (401) {json} UserError Unauthorized
 * @apiError (500) {json} ServerError Internal Server Error
 * @apiError (404) {json} UserError Not Found
 * @apiError (403) {json} UserError Forbidden
 * @apiError (422) {json} UserError Unprocessable Entity
 * @apiError (409) {json} UserError Conflict
 * @apiError (503) {json} ServerError Service Unavailable
 * @apiError (504) {json} ServerError Gateway Timeout
 * @apiError (502) {json} ServerError Bad Gateway
 */

const UpdateUserSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    fullname: z.string().min(3, "Fullname must be at least 3 characters long").optional(),
    profile_img: z.string().url("Invalid URL for profile image").optional(),
    bio: z.string().optional(),
    profile_color: z.string().optional(),
    website: z.string().url("Invalid URL for website").optional(),
    youtube: z.string().url("Invalid URL for YouTube").optional(),
    instagram: z.string().url("Invalid URL for Instagram").optional(),
    facebook: z.string().url("Invalid URL for Facebook").optional(),
    x: z.string().url("Invalid URL for X").optional(),
});

export default async function UpdateUser(req: Request, res: Response) {
    const validationResult = UpdateUserSchema.safeParse(req.body);
    const _user = req.user as UserType;

    if (!validationResult.success) {
        return res.status(400).json({ message: 'Invalid request data', errors: validationResult.error });
    }

    const {
        username,
        fullname,
        profile_img,
        bio,
        profile_color,
        website,
        youtube,
        instagram,
        facebook,
        x,
    } = validationResult.data;

    // Check if the user should be given any details except username
    if (!fullname && !profile_img && !bio && !website && !youtube && !instagram && !facebook && !x) {
        return res.status(422).json({ message: 'Unprocessable Entity' });
    }

    if (_user?.username !== username) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    let NewUserUpdateData: any = {};

    if (fullname && fullname !== _user.fullname) {
        NewUserUpdateData.fullname = fullname;
    }

    if (profile_img && profile_img !== _user.profile.profile_img) {
        NewUserUpdateData["profile.profile_img"] = profile_img;
    }

    if (bio && bio !== _user.profile.bio) {
        NewUserUpdateData["profile.bio"] = bio;
    }

    if (profile_color && profile_color !== _user.profile.profile_color) {
        NewUserUpdateData["profile.profile_color"] = profile_color;
    }

    if (website && website !== _user.social_links.website) {
        NewUserUpdateData["social_links.website"] = website;
    }

    if (youtube && youtube !== _user.social_links.youtube) {
        NewUserUpdateData["social_links.youtube"] = youtube;
    }

    if (instagram && instagram !== _user.social_links.instagram) {
        NewUserUpdateData["social_links.instagram"] = instagram;
    }

    if (facebook && facebook !== _user.social_links.facebook) {
        NewUserUpdateData["social_links.facebook"] = facebook;
    }

    if (x && x !== _user.social_links.x) {
        NewUserUpdateData["social_links.x"] = x;
    }

    if (Object.keys(NewUserUpdateData).length === 0) {
        return res.status(422).json({ message: 'Unprocessable Entity' });
    }

    // Update the user in the database
    try {
        const user = await User.findOneAndUpdate(
            { username: username },
            { $set: NewUserUpdateData },
            { new: true } // This option returns the updated document
        ).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User updated successfully', data: user });
    } catch (error) {
        logger.error('Error updating user', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}