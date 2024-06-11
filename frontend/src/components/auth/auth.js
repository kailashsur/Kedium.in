
import React from "react";
import { useSelector } from "react-redux";
import SignupForm from "./sighupForm";


//---------------------AuthForm --------------------------------------------
export default function AuthForm() {
  
  const {visible} = useSelector((state) => state.Auth);

  return (
    // Parent div of the auth popup
    <div className="  absolute top-0 h-full w-full flex justify-center items-center backdrop-blur bg-black bg-opacity-30 z-50 transition-all ">
      {
         visible ? <SignupForm  /> : "" 
      }

    </div>
  );
}

//---------------------AuthForm --------------------------------------------
