import {
  extractNameFromEmail,
  getUsernameByEmail,
  userformateDatatoSend,
} from "../lib/methodLib.js";
import { emailRegex, passwordRegex } from "../lib/regX.js";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

class AuthClass {
  // Utility function to set user cookies
  setUserCookie(res, user) {
    return res
      .status(200)
      .cookie("UserAuth", userformateDatatoSend(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      })
      .send("User cookie set successfully");
  }

  // ---signup user------------------------------------------------------
  async registerUser(req, res) {
    const { email, password } = req.body;

    // Validate email
    if (!email) {
      return res.status(403).json({ error: "Please enter an email" });
    }

    // Email and password validation (similar to your current validation)
    if (!emailRegex.test(email)) {
      return res.status(403).json({ error: "Invalid email format" });
    }
    if (!passwordRegex.test(password)) {
      return res.status(403).json({
        error:
          "Password must be 6-20 characters long with at least 1 numeric, 1 lowercase, and 1 uppercase letter",
      });
    }

    // Validate password
    if (!passwordRegex.test(password)) {
      return res.status(403).json({
        error:
          "Password should be 6 to 20 characters long with at least 1 numeric, 1 lowercase, and 1 uppercase letter",
      });
    }

    try {
      // Generate username based on email and hash password
      const username = await getUsernameByEmail(email);
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const user = await User.create({
        fullname: extractNameFromEmail(email),
        email,
        username,
        password: hashedPassword,
      });

      // Set user cookie
      return this.setUserCookie(res, user);
    } catch (error) {
      // Handle duplicate email error (code 11000)
      if (error.code === 11000) {
        return res.status(409).json({ error: "Email already exists" });
      }

      // Handle other errors
      return res.status(500).json({ error: error.message });
    }
  }

  // ------Login User----------------------------------------------------------
  async loginUser(req, res) {
    const { email, password } = req.body;

    // Email and password validation (similar to your current validation)
    
    

    try {
      const user = await User.findOne({ email }).select(
        "email password google_auth",
      );

      if (!user) {
        return res.status(402).json({ message: "Email not found" });
      }

      if (user.google_auth) {
        return res.status(403).json({
          message:
            "Account was created with Google. Please try logging in with Google.",
        });
      }

      const isPasswordValid = bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(403).json({ error: "Invalid Password" });
      }

      return this.setUserCookie(res, user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Google Auth Register or login
  async googleAuth(req, res) {
    const { email, fullname, image } = req.body;

    if (email) {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          // Register new Google user
          const username = await getUsernameByEmail(email);

          const newUser = await User.create({
            fullname,
            email,
            username,
            profile: { profile_img: image },
            google_auth: true,
          });

          return this.setUserCookie(res, newUser);
        } else {
          // Existing user, login
          return this.setUserCookie(res, user);
        }
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    } else {
      return res.status(400).json({ error: "Email is required" });
    }
  }
}

const authControllers = new AuthClass();
export default authControllers;
