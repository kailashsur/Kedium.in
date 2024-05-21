
import React from "react";
import { useSelector } from "react-redux";
import SignupForm from "./sighupForm";
import { useRouter } from "next/router";

//---------------------AuthForm --------------------------------------------
export default function AuthForm() {
  
  const {visible} = useSelector((state) => state.Auth);
  const User =  useSelector((state)=> state.User.data);

  const router = useRouter();

  
  


  return (
    // Parent div of the auth popup
    <div className=" absolute h-full w-full flex justify-center items-center backdrop-blur z-[60]">
      {
         visible ? <SignupForm  /> : "" 
      }

    </div>
  );
}

//---------------------AuthForm --------------------------------------------
