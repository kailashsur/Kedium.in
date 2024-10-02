import React from "react";
import { useSelector } from "react-redux";
import SignupForm from "./signupForm";
import { AuthState } from "@/store/slices/authSlice";
import { motion } from "framer-motion";

//---------------------AuthForm --------------------------------------------
export default function AuthForm() {
  const { visible } = useSelector((state: { Auth: AuthState }) => state.Auth);

  return (
    // Parent div of the auth popup
    <div className=" absolute top-0 h-full w-full backdrop-blur-sm flex justify-center items-center  bg-white/30 z-50 transition-all ">
      {visible ? <SignupForm /> : ""}
    </div>
  );
}

//---------------------AuthForm --------------------------------------------
