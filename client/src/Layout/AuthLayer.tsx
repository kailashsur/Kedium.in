"use client";

import { useAppDispatch } from "@/store/hooks";
// More uptimized version of the authentication layer
import React from "react";
import { useEffect } from "react";
import { fetchAccessToken } from "@/store/slices/token.slice";


export default function AuthLayer({ children }: { children: React.ReactNode }) {
 
  const dispatch = useAppDispatch();


  useEffect(()=>{
    dispatch(fetchAccessToken());
  },[])

  return <>{children}</>;
}
