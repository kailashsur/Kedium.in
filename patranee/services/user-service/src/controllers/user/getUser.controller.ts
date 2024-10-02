


/**
 * Import section
 */
import { Request, Response } from "express";
import { validate_email } from "../../utils/validators";
import User from "../../models/user.model";
import Follow from "../../models/follow.model";
import logger from "../../utils/logger";



/** Not need authentication
 * @param req
 * @param res
 * @returns USER   
 */


/**
 * Steps to get User
 * 
 * 1.
 * 2.
 */

export default async function GetUser(req: Request, res: Response) {

    /**
     * Extract Informatins from body and user
     */

    const { email } = req.body as { username: string, email: string };
    const username = req.query.username as string || req.body.username as string;
    /**
     * Validate Request data
     */
    if (!username && !email) {
        return res.status(400).json({ message: 'Invalid request' });
    }

    if (email && !validate_email(email)) {
        return res.status(400).json({ message: 'Invalid email' });
    }



    /**
     * Try Catch Block to perform db operateions
     */
    try {

        /** Check the user is available in the db or not */
        // const user = await User.findOne({ username: username }).select('-password')

        // if (!user) {
        //     return res.status(404).json({ message: "User is not found" });
        // }

        // const follow = await Follow.findOne(user._id);

        // user.set 

        // get the user details with agrigation pipeline, fetch user details from user collection and follow details from follow collection
        // if the user is following the user then follow details will be there otherwise it will be null

        const [ user ] = await User.aggregate([
            {
                $match: {
                    $or: [{ username: username },
                        { email: email }]
                }
                
            },
            {
                $lookup: {
                    from: 'follows',
                    let: { user_id: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$user_id', '$$user_id'] },
                                        
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'follow'
                }
            },
            {
                $unwind:{
                    path: '$follow',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                   
                    password: 0,
                    refreshToken : 0,
                   
                    __v: 0,
                  
                    'follow.joinedAt': 0,
                    'follow.updatedAt': 0,
                    'follow.__v': 0,

                    forgot_password: 0,
                    forgotPasswordExpiresAt: 0,
                    otp : 0,
                    otpExpires : 0,


                }
            }
        ])



        return res.status(200).json({ user })

    } catch (error) {
        logger.error('Error in getting user', error);
        return res.status(500).json({ message: 'Internal server error' });
    }


}

