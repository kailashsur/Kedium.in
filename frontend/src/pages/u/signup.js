
import { useDispatch, useSelector } from "react-redux";

import AuthForm from "@/components/auth/auth";
import AuthLayer from "../AuthLayer";
import { useEffect } from "react";
import { enable } from "@/store/slices/authSlice";

export default function SignUp(){
    const userData = useSelector((state) => state.User.data);
    const dispatch = useDispatch();


    useEffect(()=>{
        if(!userData?.access_token){
            dispatch(enable("signup"))
        }
        else{
            window.location.href = "/";
        }
    },[dispatch, userData?.access_token])

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