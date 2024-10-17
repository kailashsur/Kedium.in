import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';


export interface BlogType extends Document {
  _id : Schema.Types.ObjectId;
  slug : string;
  title : string;
  thumbnail : string;
  description : string;
  content : string;
  tags : string[];
  category : string;
  author : Schema.Types.ObjectId;
  activity : {
      likes : number;
      comments : number;
      views : number;
  };
  draft : boolean;
  createdAt : Date;
  updatedAt : Date;
}


export interface ActivityType extends Document {
  _id : Schema.Types.ObjectId;
  blog_id : Schema.Types.ObjectId;
  slug : string;
  likes : Schema.Types.ObjectId[];
  comments : Schema.Types.ObjectId[];
  createdAt : Date;
  updatedAt : Date;
}

export interface CommentsType extends Document{
  _id : Schema.Types.ObjectId;
  blog_id : Schema.Types.ObjectId;
  user_id : Schema.Types.ObjectId;
  comment : string;
  createdAt : Date;
  updatedAt : Date;
}

export interface CustomJwtPayload extends JwtPayload {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  role: string;
  profile_img: string;
  profile_color: string;
}

export interface UserType extends Document {
  _id: Schema.Types.ObjectId;
  fullname: string;
  username: string;
  email: string;
  email_verified: boolean;
  password: string;
  forgot_password: boolean;
  forgotPasswordExpiresAt: Date | null;
  refreshToken: string;
  otp: string | null;
  otpExpires: Date | null;
  profile: {
    bio: string;
    cover_img: string;
    profile_img: string;
    profile_color: string;
  };
  role: string;
  verified: boolean;
  interested_in: string[];
  reading_list: Schema.Types.ObjectId[];
  total_blogs: number;
  followers_count: number;
  following_count: number;
  followers: Schema.Types.ObjectId[];
  following: Schema.Types.ObjectId[];
  social_links: {
    youtube: string;
    instagram: string;
    facebook: string;
    x: string;
    github: string;
    website: string;
  };
  google_auth: boolean;
  github_auth: boolean;
  facebook_auth: boolean;
  x_auth: boolean;
  linkedin_auth: boolean;

  pinned_post: Schema.Types.ObjectId[];
  blogs: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;


  /**
   * Methods
   */
  isPasswordMatch(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;

}


export interface FollowType extends Document {
  user_id: Schema.Types.ObjectId;
  following: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  following_count: number;
  followers_count: number;
  createdAt: Date;
  updatedAt: Date;
}