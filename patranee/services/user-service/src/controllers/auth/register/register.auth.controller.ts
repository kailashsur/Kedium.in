/**
 * This controller is responsible for handling the user registration process and sending an OTP to the user's email. 
 */
import { Request, Response } from "express";
import { UserType } from "../../../Types";
import User from "../../../models/user.model";
import { transporter } from "../../../config/email";
import { generateOTP, generateOTPExpires } from "../../../services/otp.service";
import bcrypt from 'bcryptjs';
import { emailRegex, passwordRegex } from "../../../lib/regeX";
import { extractNameFromEmail, getUsernameByEmail } from "../../../lib/methods.lib";
import { setUserCookie } from "../../../utils/setCookies";
import { otpTemplate } from "../../../Email/Templates/OTP.Template";
//* IMPORT JWT SECRET


/**
 *  All the steps to register a user
 *  
 * 1. Validate request body - [Step 1]
 * 2. Validate email and password with Regex - [Step 2]
 * 3. Check if user already exists - [Step 3]
 * 4. Generate username and fullname - [Step 4]
 * 5. Hash the password - [Step 5]
 * 6. Create a new user - [Step 6]
 * 7. Generate OTP - [Step 7]
 * 8. Save the user - [Step 8]
 * 9. Send OTP to the user's email - [Step 9]
 * 10. Set user cookie and send response to the client - [Step 10]
 *  
 */



export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    /** [Step 1]
     * Validate request body
     */
    if (!email && !password) {
        return res.status(400).json({ message: 'Email and Password are required' });
    }

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    /**[Step 2]
     *  Email and password validation with Regex
     */

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid Email' });
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Password must be 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter' });
    }





    try {
        /**[Step 3]
         * Check if user already exists
         */

        const user_exists = await User.findOne({ email });


        if (user_exists) return res.status(400).json({ message: 'User already exists' });

        /**
         *  If the user is not exist
         */

        /**[Step 4]
         *  Generate username and fullname
         * and hash the password [Step 5]
         */

        const fullname = extractNameFromEmail(email);
        const username = await getUsernameByEmail(email);
        // const hashedPassword = await bcrypt.hash(password, 10);
        const hashedPassword = password;

        /**[Step 6]
         *  Create a new user   ----------------------------------------------------------- Generating the user document
         */

        const newUser = new User({
            fullname: fullname,
            email: email,
            username: username,
            password: hashedPassword,
        });


        /**[Step 7]
         * Generate OTP and save the user
         */
        const otp = generateOTP();
        newUser.otp = otp;
        newUser.otpExpires = generateOTPExpires();



        /**
         * Generate Tokens
         * Generate access token and then store the refresh token
        */

        const accessToken = newUser.generateAccessToken();
        const refreshToken = newUser.generateRefreshToken();

        /**
         * Store Refresh Token in db
        */

        newUser.refreshToken = refreshToken;

        /**[Step 8]
         * Save the user with the new otp and expiry in database
         */
        await newUser.save();
        /**[Step 9]
         * Send OTP to the user's email
         * 
         */

        // Send OTP via email
        transporter.sendMail({
            from: `Patranee <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Hi, ${newUser.fullname} Verify your account`,
            text: `Your OTP is ${otp}`,
            html: otpTemplate(otp),

        });





        /**[Step 10]
         * Set user cookie and send response to the client 
         */
        // setUserCookie(res, newUser, 'User registered, please verify your email');

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
        .json({
            message : `You are registered successfully, OTP is sent to email ${newUser.email}, please verify your email`,
            
            accessToken,
            refreshToken
        })


    } catch (err) {
        console.error("Error at :: register.auth.controller.ts :: register()", err);
        res.status(500).json({ message: 'Server error ' });
    }
};
