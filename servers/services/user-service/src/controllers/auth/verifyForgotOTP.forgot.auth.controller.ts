/**
    Verify the forgot password OTP
*/
import { Request, Response } from "express";
import { validate_email } from "../../utils/validators";
import User from "../../models/user.model";

/**
 * 
 * @param req 
 * @param res 
 * @returns
 * 
 * Verify the forgot password OTP
 * 
 */




export const verifyForgotOTP = async (req: Request, res: Response) => {
    //* Get the email and OTP from the request body
    const { email, otp } = req.body;

    /**
     * Check if the email is provided
     */
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    if(!validate_email(email)){
        return res.status(400).json({ message: 'Invalid Email' });
    }



    /**
     * Check if the OTP is provided
     */
    if (!otp) {
        return res.status(400).json({ message: 'OTP is required' });
    }

    try {
        
        /**
     * Check if the user exists
     */

    const user = await User.findOne({ email }).select('+otp +otpExpires +forgot_password +forgotPasswordExpiresAt');

    if (!user) {
        return res.status(400).json({ message: 'This email is not registered' });
    }

    /**
     * Check if the OTP is valid
     */


    if (user.otp !== otp || user.otpExpires! < new Date() ) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
    
    }

    
    //* Set forgot password to true
    user.forgot_password = true;
    user.forgotPasswordExpiresAt = new Date(Date.now() + 20 * 60 * 1000); // 20 min expiry


    /**
     *  Set the verified to true
     */
    
    user.otp = null;
    user.otpExpires = null;

    /**
     * Save the user in the database
     */
    await user.save({ validateBeforeSave: false });

    /**
     * Return the response
     */

    return res.status(200).json({ message: 'OTP verified' });


    } catch (error) {
        console.log("Error on server :: at verifyForgotOTP() ", error);
        return res.status(500).json({ message: 'Internal server error' });
    }

}