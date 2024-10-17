/**
 *
 *  This controller is responsible for handling the forgot password process and
 *  sending an OTP to the user's email.
 *
 */

import { Request, Response } from "express";
import User from "../../models/user.model";
import { generateOTP, generateOTPExpires } from "../../services/otp.service";
import { transporter } from "../../config/email";
import { UserType } from "../../Types";
import { validate_email } from "../../utils/validators";
import { otpTemplate } from "../../Email/Templates/OTP.Template";

/**
 *
 * @param req email
 * @param res
 * @returns
 *
 *  Send OTP to user's email
 *
 */

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const _user = req.user as UserType;

  /**
   * Check if email is valid
   */

  if(!validate_email(email)){
    return res.status(400).json({message : "Invalid email"});
  }

  /**
   * check the user email and email is same or not
   */
  if (_user?.email !== email) {
    return res.status(400).json({ message: "This email is not registred" });
  }

  try {
    /**
     * Check if user already exists
     */
    const user_exists = await User.findOne({ 
      $and : [{email : email}, {_id : _user?._id}]
     });


    if (!user_exists) {
      return res.status(400).json({ message: "User not found" });
    }

    const user: UserType = user_exists;

    /**
     * generate otp and send to email, and give it for 15 minutes expiry
     */

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = generateOTPExpires();

    /**
     * Save the user with the new otp and expiry in database
     */
    await user.save({ validateBeforeSave: false });

    /**
     *
     *  Send OTP to user's email
     *
     */

    transporter.sendMail({
      from: `Patranee <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Verify your account",
      text: `Your OTP is ${otp}`,
      html: otpTemplate(otp, user.fullname, `/@${user.username}/settings/forgot-password/verify-otp`),
    });

    res.status(200).json({ message: `OTP sent to email ${user.email}` });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
