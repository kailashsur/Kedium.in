import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserType } from '../Types';
import dotenv from 'dotenv';
dotenv.config();


let profile_imgs_name_list: string[] = [
  "Garfield",
  "Tinkerbell",
  "Annie",
  "Loki",
  "Cleo",
  "Angel",
  "Bob",
  "Mia",
  "Coco",
  "Gracie",
  "Bear",
  "Bella",
  "Abby",
  "Harley",
  "Cali",
  "Leo",
  "Luna",
  "Jack",
  "Felix",
  "Kiki",
];
let profile_imgs_collections_list: string[] = [
  "notionists-neutral",
  "adventurer-neutral",
  "fun-emoji",
];

const userSchema = new Schema<UserType>({
  fullname: {
    type: String,
    lowercase: true,
    required: false,
    default: "",
    trim: true,
    index : true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    unique: true,
    trim: true,
    select: true,
  },
  username: {
    type: String,
    minlength: [3, "Username must be 3 letters long"],
    unique: true,
    lowercase: true,
    required: [true, "Username is required"],
    trim: true,
    index : true,
  },

/**
 * Authentication
 */

   /**
    * password is not required if user is using google_auth, github_auth, facebook_auth, x_auth, linkedin_auth
    */
  
  password: {
    type: String,
    required: function () {
      return !this.google_auth && !this.github_auth && !this.facebook_auth && !this.x_auth && !this.linkedin_auth;
    },
    select: false,
  },
  forgot_password: {
    type: Boolean,
    default: false,
    select: false,
  },
  forgotPasswordExpiresAt: {
    type: Date,
    default: null,
    select: false,
  },


  refreshToken:{
    type : String,
    select : false,

  },





  role: {
    type: String,
    enum: ["USER", "MEMBER", "ADMIN"], // role can only be 'user' or 'admin'
    default: "USER", // default role is 'user'
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },

  otp: { type: String, default: null, select: false, },
  otpExpires: { type: Date, default: null, select: false, },

  profile: {
    bio: {
      type: String,
      maxlength: [200, "Bio should not be more than 200"],
      default: "",
    },
    cover_img: {
      type: String,
    },

    profile_img: {
      type: String,     // cloudinary url
      default: () => {
        return `https://api.dicebear.com/6.x/${profile_imgs_collections_list[
          Math.floor(Math.random() * profile_imgs_collections_list.length)
          ]
          }/svg?seed=${profile_imgs_name_list[
          Math.floor(Math.random() * profile_imgs_name_list.length)
          ]
          }`;
      },
    },
    profile_color: {
      type: String,
      default: "#FBA1B7",
    },
  },

  interested_in: {
    type: [String], // catagories
    default: [],
  },

  reading_list: {
    type: [Schema.Types.ObjectId],
    ref: "blogs",
    default: [],
  },

  total_blogs: {
    type: Number,
    default: 0,
  },


  // Oauth2.0



  google_auth: {
    type: Boolean,
    // required: function () {
    //   return !this.password && !this.github_auth && !this.facebook_auth && !this.x_auth && !this.linkedin_auth;
    // },
    select: false,
    default: false,  // Default: Google auth not used
  },
  github_auth: {
    type: Boolean,
    // required: function () {
    //   return !this.password && !this.google_auth && !this.facebook_auth && !this.x_auth && !this.linkedin_auth;
    // },
    select: false,
    default: false,  // Default: GitHub auth not used
  },
  facebook_auth: {
    type: Boolean,
    // required: function () {
    //   return !this.password && !this.google_auth && !this.github_auth && !this.x_auth && !this.linkedin_auth;
    // },
    select: false,
    default: false,  // Default: Facebook auth not used
  },
  x_auth: {
    type: Boolean,
    // required: function () {
    //   return !this.password && !this.google_auth && !this.github_auth && !this.facebook_auth && !this.linkedin_auth;
    // },
    default: false,
    select: false,
  },
  linkedin_auth: {
    type: Boolean,
    // required : function () {
    //   return !this.password && !this.google_auth && !this.github_auth && !this.facebook_auth && !this.x_auth;
    // },
    default: false,
    select: false,
  },



  // other fields as needed
  social_links: {
    youtube: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
    x: {
      type: String,
      default: "",
    },
    github: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
  },

  pinned_post: {
    type: [Schema.Types.ObjectId],
    ref: "blogs",
    default: [],
  },
  blogs: {
    type: [Schema.Types.ObjectId],
    ref: "blogs",
    default: [],
  },
}, {
  timestamps: {
    createdAt: "joinedAt",
  },
},);

/**
 * Hash the password before saving the user model
 */
userSchema.pre('save', async function (next) {
  const user = this as UserType;
  if (!user.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});



/**
 *  Check if the entered password matches the hashed password in the database
 */

userSchema.methods.isPasswordMatch = async function (password : string) : Promise<boolean> {
  /**
   *
   */
  const user = this as UserType;

  /**
   * Check if the entered password matches the hashed password in the database
   */
  return await bcrypt.compare(password, user.password);
}


/**
 * 
 * types of jwt payload
 */

export interface CustomJwtPayload extends JwtPayload {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  role: string;
  profile_img: string;
  profile_color: string;
}

export interface RefreshTokenPayload extends JwtPayload {
  _id: string;
  username: string;
}

/**
 * Generate JWT token
 */
userSchema.methods.generateAccessToken = function () {
  return jwt.sign({
    _id: this._id,
    username: this.username,
    fullname: this.fullname,
    email: this.email,
    role: this.role,
    profile_img: this.profile?.profile_img,
    profile_color: this.profile?.profile_color,
  } ,
    process.env.JWT_ACCESS_TOKEN_SECRET!,
    { expiresIn: process.env.JWT_ACCESS_TOKEN_SECRET_EXPIRE });
}

/**
 * @description Generate Refresh Token
 * @returns Refresh Token
 */
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({
    _id: this._id,
    username: this.username,
    
  } ,
    process.env.JWT_REFRESH_TOKEN_SECRET!,
    { expiresIn: process.env.JWT_REFRESH_TOKEN_SECRET_EXPIRE });
}



const User = mongoose.model<UserType>('User', userSchema);
export default User;
