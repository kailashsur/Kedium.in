import { Response } from "express";
import { UserType } from "../Types";
import { userformateDatatoSend } from "../lib/methods.lib";


export function setUserCookie(res: Response, user : UserType, message : string) {
    res
      .status(200)
      .cookie("UserAuth", JSON.stringify(userformateDatatoSend(user)), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "lax" : "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      })
      .json({ message : message });
  }