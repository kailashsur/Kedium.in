import { Request, Response } from "express"
import User, { RefreshTokenPayload } from "../../models/user.model";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { generateAccessTokenAndRefreshToken } from "../../services/token.service";


/**
 * Refresh Access Token
 * @param req 
 * @param res 
 * @returns 
 */
export const refreshAccessToken = async (req: Request, res: Response) => {

    /**
     * get the refresh token from cookies or headers or body
     */

    const refreshToken = req.cookies?.refreshToken || req.headers['authorization']?.replace('Bearer ', '') || req.body.refreshToken;

    /**
     *  check if the refresh token is defined
     */
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh Token not defined' });
    }

    /**
     * check if the refresh token is valid with jwt
     */

    try {

        /**
         * decode the refresh token
         */
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET!) as RefreshTokenPayload;

        // check if the decoded token is valid
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid Refresh Token' });
        }

        /**
         * check if the user exists in mongodb
         */
        const user = await User.findById((decoded as RefreshTokenPayload)._id).select('+refreshToken');

        // check if the user exists
        if(!user){
            return res.json({message : 'User not found'});
        }

        // check if the refresh token is same as in db
        if(user?.refreshToken !== refreshToken){
            return res.json({message : 'Refresh token is expired or used'});
        }

        // generate new access token and refresh token
        const tokens  = await generateAccessTokenAndRefreshToken(user._id);

        // update the refresh token in the db

        user.refreshToken = tokens?.refreshToken;

        await user.save({validateBeforeSave : false});
        

        // set the new access token in the cookies
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            
        }

        /**
         * send the new access token in the cookie
         */
        return res.status(200)
        .cookie('accessToken', tokens?.accessToken, {...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000})
        .cookie('refreshToken', tokens?.refreshToken, {...cookieOptions, maxAge: 30 * 24 * 60 * 60 * 1000})
        .json({message : 'Access Token Renewed'});

        
    } catch (error ) {

        return res.status(500).json({message : 'Server Error, Error in refreshing access token'});
    }


}