import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/user.model";
import { UserType } from "../Types";
import 'dotenv/config';


const userformateDatatoSend = (user: UserType) => {
  const access_token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET!,
  );

  return {
    access_token,
    user: {
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      role : user.role,
      email_verified: user.email_verified,
      verified: user.verified,
      google_auth: user.google_auth,
      github_auth: user.github_auth,
      facebook_auth: user.facebook_auth,
      x_auth: user.x_auth,
      linkedin_auth: user.linkedin_auth,
    },
  };
};

const getUsernameByEmail = async (email: string) => {
  const { nanoid } = await import('nanoid');

  let username = email.split("@")[0]; // 'as@gmail.com -> [as, gmail]->as

  let isUsernameNotUnique = await User.exists({ username: username }).then(
    (result) => result,
  );

  isUsernameNotUnique ? (username += nanoid().substring(0, 5)) : "";
  return username;
};

function extractNameFromEmail(email: string) {
  // Split the email address by "@" symbol
  var parts = email.split("@");

  // If the email address doesn't contain "@" or the parts are not exactly 2
  if (parts.length !== 2) {
    return "Invalid email address";
  }

  // Get the part before "@" symbol
  var namePart = parts[0];

  // Split the name part by any digits
  var name = namePart.split(/\d+/).join("").trim();

  return name;
}

export function removeAtSymbol(username: string) {
  if (username.startsWith("@")) {
    return username.slice(1); // Remove the first character
  }
  return username; // Return the username unchanged
}

export { userformateDatatoSend, getUsernameByEmail, extractNameFromEmail };
