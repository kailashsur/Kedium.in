import { Request, Response } from 'express';
import User from '../../../models/user.model';
import { emailRegex, passwordRegex } from '../../../lib/regeX';
import logger from '../../../utils/logger';
import { UserType } from '../../../Types';


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
export const LoginWithAccessToken = async (req: Request, res: Response) => {
    //make the username is optional, username or email can be used to login
    // one of them is required


    const user = req.user as UserType;

    return res.status(200).json({ message : 'Login successful', data : user });
};
