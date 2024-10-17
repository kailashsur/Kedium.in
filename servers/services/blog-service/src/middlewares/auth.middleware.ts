import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../utils/errorHandlers';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { CustomJwtPayload } from '../Types';
import axios from 'axios';

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 * 
 * Verify JWT
 * 
 */

/**
 *  Process of verifying JWT
 * 
 * 1. Get the access token from the request - [Step 1]
 * 2. Check if the access token exists - [Step 2]
 * 3. Verify the access token - [Step 3]
 * 4. If JWT Secret is not defined, return an error - [Step 4]
 * 5. Verify the access token and decode it - [Step 5]
 * 6. If the access token is invalid, return an error - [Step 6]
 * 7. Set the user in the request object - [Step 7]
 * 8. If the access token is valid, move to the next middleware - [Step 8]
 * 
 * 
 */


export const verifyJWT = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

   
    /** [Step 1]
     * Get the access token from the request
     */
    const access_token = req.cookies?.accessToken || req.headers['authorization']?.replace('Bearer ', '');

    /** [Step 2]
     * Check if the access token exists
     */
    if (!access_token) {
        return res.status(401).json({ message: 'Access Token not defined' });
    }



    /** [Step 3]
     * Verify the access token
     */
    try {
        /** [Step 4]
         * If JWT Secret is not defined, return an error
         */
        if (!process.env.JWT_ACCESS_TOKEN_SECRET) {
            return res.status(500).json({ message: 'JWT Secret is not defined' });
        }

        /** [Step 5]
         * Verify the access token and decode it
         */
        const decoded =  jwt.verify(access_token, process.env.JWT_ACCESS_TOKEN_SECRET) as CustomJwtPayload;

        /** [Step 6]
         * If the access token is invalid, return an error
         */
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid Access Token' });
        }

        /**
         * Check at db
         */
        const {data} = await axios.get(`${process.env.USER_SERVICE_URL}/api/v1/get-user?username=${decoded.username}`);

        if(!data){
            return res.status(401).json({ message: 'Invalid Access Token' });
        }

        /** [Step 7]
         * Set the  new user object in the request object
         */
        req.user = data.user;


        /** [Step 8]
         * If the access token is valid, move to the next middleware
         */

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid Access Token' });
    }

});