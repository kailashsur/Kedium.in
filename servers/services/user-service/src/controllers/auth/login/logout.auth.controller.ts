import { Request, Response } from 'express';
import User from '../../../models/user.model';
import { UserType } from '../../../Types';




export const logout = async (req: Request, res: Response) => {

    /**
     * get user and check the user is logged in
     * 
     */
    const _user : UserType | undefined = req.user as UserType | undefined;

    if (!_user) {
        return res.status(401).json({ message: 'User is not logged in' });
    }

    /**
     * remove the refresh token from the database
     */
    
    await User.findByIdAndUpdate(_user._id, 
        { 
            $unset : { refreshToken : ''}
        }
    ).select('+refreshToken');

    // save the user to the db and make changes to the user object



    /**
     * clear the cookies
     */

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    }

    return res.status(200).clearCookie('accessToken', cookieOptions).clearCookie('refreshToken', cookieOptions).json({ message: 'Logout successful' });
    
}