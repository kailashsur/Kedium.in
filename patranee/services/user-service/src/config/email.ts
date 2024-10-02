
/**
 * 
 *  Email Configuration
 * 
 */

import  nodemailer from 'nodemailer';
import 'dotenv/config';

export const transporter = nodemailer.createTransport({
    // host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    // secure: Boolean(process.env.EMAIL_SECURE),
    // auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS
    // }
    service: 'gmail',
    secure: process.env.EMAIL_SECURE === 'true' ? true : false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});