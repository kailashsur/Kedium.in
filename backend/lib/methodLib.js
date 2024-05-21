import jwt from "jsonwebtoken"
import 'dotenv/config'
import { nanoid } from "nanoid";
import User from "../models/User.js";


const userformateDatatoSend = (user) => {

    const access_token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY);

    return {
        access_token,
        profile_img: user.profile_img,
        username: user.username,
        fullname: user.fullname,
        email : user.email,
        bio : user.bio,
        
    }
}

const getUsernameByEmail = async (email) => {
    let username = email.split("@")[0]; // 'as@gmail.com -> [as, gmail]->as

    let isUsernameNotUnique = await User.exists({ "username": username }).then((result) => result)

    isUsernameNotUnique ? username += nanoid().substring(0, 5) : "";
    return username
}


function extractNameFromEmail(email) {
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




export { userformateDatatoSend, getUsernameByEmail, extractNameFromEmail }