"use client";

// Desc: This file contains the layout of the application. It is the parent component of all the pages and components.
import React from "react";
import Header from "@/components/sections/Header";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/sections/Footer";
import AuthLayer from "./AuthLayer";
import { useSelector } from "react-redux";
import { TokenState } from "@/store/slices/token.slice";
import Loader from "@/components/ui/loader";






export default function Layout({ children }: { children: React.ReactNode }) {
 

  return (
  <AuthLayer>
    <main className=" w-full min-h-screen h-full flex flex-col justify-between">
      <Header />
      <Toaster position="top-center" reverseOrder={false} />

      

      <div className=" w-full h-auto flex justify-center  ">
        <div className=" w-full max-w-5xl bg-lime-500">
          {children}
        </div>
       
      </div>

      <Footer />
    </main>
  </AuthLayer>
  );
}
