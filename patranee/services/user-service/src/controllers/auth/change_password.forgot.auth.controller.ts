/**
 *  Change password after the otp is verified
 * 
 */
import { Request, Response } from "express";
import User from "../../models/user.model";
import { emailRegex, passwordRegex } from "../../lib/regeX";
import bcrypt from 'bcryptjs';
import { validate_email } from "../../utils/validators";
import { UserType } from "../../Types";






/**
 * 
 * @param req 
 * @param res  
 * @returns
 * 
 * Methods to change password after the OTP is verified 
 * Declaration of the changePassword function
 */
export const changePassword = async (req: Request, res: Response) => {

    const { oldPassword, newPassword, conformPassword } = req.body;
    const _user = req.user as UserType;

    /**
     * Validate request body
     */
    if (!oldPassword || !newPassword || !conformPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    /**
     * Check if the new password is valid
     */
    if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({ message: 'Password must be 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter' });
    }

    /**
     * Check if the new password and conform password are same
     */
    if (newPassword !== conformPassword) {
        return res.status(400).json({ message: 'Password does not match' });
    }

    /**
     * Check if the new password and old password are same
     */

    if (newPassword === oldPassword) {
        return res.status(400).json({ message: 'New password and old password are same' });
    }



    /**
     *  Try block to catch the error
     */

    try {
        /**
        * Check if user exists in db
        */
        const user = await User.findOne({ _id: _user?._id }).select('+password +forgot_password +forgotPasswordExpiresAt');

        if (!user) {
            return res.status(400).json({ message: 'This email is not registred' });
        }

        /**
         * Check if the newPassword is same as the old password
         * 
        */
        const isPasswordMatch = await user.isPasswordMatch(newPassword);

        if (isPasswordMatch) {
            return res.status(400).json({ message: 'New password and old password are same' });
        }


        /**
         * 
         * And check if the forgot password expiry date is valid
         * and check forgot_password is true or not
         */

        if (user.forgot_password !== true && user.forgotPasswordExpiresAt! < new Date()) {

            return res.status(400).json({ message: 'Expired the reset password session' });
        }

        /**
         * Update the password
         */


        user.forgot_password = false;
        user.forgotPasswordExpiresAt = null;
        user.password = newPassword;

        /**
         * Save the user
         */
        await user.save();

        return res.status(200).json({ message: 'Password changed successfully' });

    } 
    catch (error) {

    }

}