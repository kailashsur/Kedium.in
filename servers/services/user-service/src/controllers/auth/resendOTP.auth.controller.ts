
import { Request, Response } from "express"
import { UserType } from "../../Types";
import { validate_email } from "../../utils/validators";
import User from "../../models/user.model";
import { generateOTP, generateOTPExpires } from "../../services/otp.service";
import { transporter } from "../../config/email";
import { otpTemplate } from "../../Email/Templates/OTP.Template";


export const ResendOTP = async (req : Request, res : Response)=>{

    const {email} = req.body;
    const _user = req.user as UserType;

    if(!validate_email(email)){
        return res.status(400).json({message : "Invalid email"});
    }

    if (_user?.email !== email) {
        return res.status(400).json({ message: "This email is not registred" });
    }




    try {
        
    const user_exists = await User.findOne({
        $and : [{email : email}, {_id : _user?._id}]
    });

    if (!user_exists) {
        return res.status(400).json({ message: "User not found" });
    }

    const user: UserType = user_exists;


    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = generateOTPExpires();

    await user.save({validateBeforeSave : false});

    /**
     * Resend the otp to the user's email
     * 
     */

    

    await transporter.sendMail({
        from: `Patranee <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Verify your account",
        text: `Your OTP is ${otp}`,
        html: otpTemplate(otp),
      })
    
        return res.status(200).json({ message: `OTP sent to your email ${user.email}` });

    } catch (error) {
     console.error("Error at :: resendOTP.auth.controller.ts :: ResendOTP()", error);
        return res.status(500).json({message : "Internal server error"});   
    }
}