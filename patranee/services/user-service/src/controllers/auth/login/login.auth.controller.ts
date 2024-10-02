import { Request, Response } from 'express';
import User from '../../../models/user.model';
import { emailRegex, passwordRegex } from '../../../lib/regeX';
import logger from '../../../utils/logger';


/**
 * 
 * @param req 
 * @param res 
 * @returns 
 * 
 *  Login user
 *   
 */

/** Process of login
 * 
 * 1. Validate request body - [Step 1]
 * 2. Validate email and password with Regex - [Step 2]
 * 3. Check if user already exists - [Step 3]
 * 4. Compare the entered password with the hashed password in the database - [Step 4]
 * 5. Generate Tokens - [Step 5]
 * 6. Store Refresh Token in HttpOnly Cookie - [Step 6]
 * 7. Send response to the client - [Step 7]
 * 
 * 
 */



/**
 * MAIN METHOD
 * 
 */
export const login = async (req: Request, res: Response) => {
    //make the username is optional, username or email can be used to login
    // one of them is required


    const { email, username, password } = req.body;

    /**
       * Validate request body
       */
    if (!email && !username) {
        return res.status(400).json({ message: 'Email or Username are required' });
    }

    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    /**
     *  Email and password validation with Regex
     */

    if (email) {
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid Email' });
        }
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Password must be 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter' });
    }


    try {
        /**
         * check email or username exists
         */
        //db call
        const user = await User.findOne({
            $or: [{ email: email }, { username: username }],
        }).select('+password');


        if (!user) return res.status(400).json({ message: 'You have not registred' });



        /**
         * Check if the entered password matches the hashed password in the database
         */

        const isPasswordValid = await user.isPasswordMatch(password);

        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid Password' });


        /**
         * Generate Tokens
         * generate access token and then store the refresh token
         */

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        /**
         * Store Refresh Token in db
         */
        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });

        // Store Refresh Token in HttpOnly Cookie
        // Send response to the client

       
        return res.status(200)
        .cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Ensures cookie is sent only over HTTPS in production
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        })
        .cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Ensures cookie is sent only over HTTPS in production
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        })
        .json({ message: 'Login successful',
            accessToken,
            refreshToken
         });


    } catch (error) {
        logger.error('Login error', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
