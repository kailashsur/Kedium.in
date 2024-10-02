import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { Error, ObjectId } from 'mongoose';
import User from '../models/user.model';

import { UserType } from '../Types';

dotenv.config();




export const generateAccessTokenAndRefreshToken = async (userId : ObjectId) : Promise<{
  accessToken: string;
  refreshToken: string;
}> => {

  try {
    
    const user = await User.findById({ _id: userId }) as UserType;

    if (!user) {
      throw new Error('User not found');
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({validateBeforeSave: false});

    return { accessToken, refreshToken };

  } catch (error) {
    
    throw new Error('Error in generating access token and refresh token');

  }
}







// Generate Access Token
export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '15m' });
};

// Generate Refresh Token (stored in HttpOnly cookie)
export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' });
};

// Verify Access Token
export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};

// Verify Refresh Token
export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
};
