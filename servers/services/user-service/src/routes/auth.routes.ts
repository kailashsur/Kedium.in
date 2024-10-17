import { Router } from "express";
import { login, logout, register, changePassword, forgotPassword, refreshAccessToken, VerifyEmailOTP } from "../controllers";

import { verifyJWT } from "../middlewares/auth.middleware";
import { verifyForgotOTP } from "../controllers/auth/verifyForgotOTP.forgot.auth.controller";
import { ResendOTP } from "../controllers/auth/resendOTP.auth.controller";


/**
 * 
 * @description Auth routes
 * @file auth.routes.ts
 * @module auth.routes.ts
 * @version 0.0.1
 * @since 0.0.1
 * 
 * 
 */



/**
 * Define the auth routes
 */
const auth_router = Router();


/**
 * All the auth routes assigned here
 */

// router.route('/upload').post(upload.single('file'), (req, res) => {});

auth_router.route('/').get((req, res) => {
    res.send('Auth route Api is running');
});

auth_router.route('/register').post(register);
auth_router.route('/login').post(login);

/**
 * Verify otp
 */
auth_router.route('/verify-otp').post(verifyJWT, VerifyEmailOTP);

/**
 * Resend otp
*/
auth_router.route('/resend-otp').post(verifyJWT, ResendOTP);

/**
 * forgot password
*/
auth_router.route('/verify-forgot-otp').post(verifyJWT, verifyForgotOTP);
auth_router.route('/forgot-password').post(verifyJWT, forgotPassword);
//  -- change password api --
auth_router.route('/change-password').put(verifyJWT, changePassword);
//  -- change password web page --

/**
 * Secured route
 */
auth_router.route('/logout').post(verifyJWT, logout);

/**
 * refressAccess token
 */
auth_router.route('/refresh-token').post(refreshAccessToken);



export default auth_router;