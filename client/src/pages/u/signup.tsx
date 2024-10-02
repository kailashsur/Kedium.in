"use client";
import { useDispatch, useSelector } from "react-redux";

import AuthForm from "@/components/auth/auth";
import AuthLayer from "@/Layout/AuthLayer";
import { useEffect } from "react";
import { enable } from "@/store/slices/authSlice";
import { UserState } from "@/store/slices/userSlice";

export default function SignUp(){
    const userData = useSelector((state : {User : UserState}) => state.User.data);
    const dispatch = useDispatch();


    useEffect(()=>{
        if(!userData?.access_token){
            dispatch(enable("signup"))
        }
        else{
            window.location.href = "/";
        }
    },[dispatch, userData?.access_token])
// TODO: import the loading animation compoenent
    return (
        <>
        <AuthLayer>
            <div className=" flex justify-center items-center w-full h-full">
           
           {
               !userData?.access_token ? <AuthForm /> : "Loading..."
            }
            </div>
        </AuthLayer>
        </>

    )
}