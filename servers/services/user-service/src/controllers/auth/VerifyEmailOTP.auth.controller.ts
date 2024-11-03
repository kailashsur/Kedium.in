import { Request, Response } from "express";
import User from "../../models/user.model";
import { UserType } from "../../Types";

/**
 *  Verify OTP and set verified to true 
 */
export const VerifyEmailOTP = async (req: Request, res: Response) => {
    const { otp } = req.body;
    const _user = req.user as UserType;

    try {
        // Check if user exists
        const user = await User.findOne({ _id: _user?._id }).select('+otp +otpExpires');

        if (!user) {
            return res.status(400).json({ message: 'You are not registered' });
        }

        // Check if OTP is valid
        if(!user.otpExpires ){
            return res.status(400).json({message : "OTP has not provided"});
        }

        if (user.otpExpires < new Date()) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Set verified to true
        user.email_verified = true;
        user.otp = null;
        user.otpExpires = null;
        await user.save({ validateBeforeSave: false });

        res.status(200).json({ message: 'Account verified' });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};