import { Request, Response } from "express";
import User from "../models/user.model";



/**
 *  
 *  @returns {string} - 6 digit OTP
 * 
 */
export function generateOTP(): string{

    return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateOTPExpires(): Date{
    return new Date(Date.now() + 15 * 60 * 1000); // 15 min expiry
}


