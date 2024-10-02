"use client";

// Desc: This file contains the layout of the application. It is the parent component of all the pages and components.
import React from "react";
import Header from "@/components/sections/Header";
import { useSelector } from "react-redux";
import AuthLayer from "./AuthLayer";
import { Toaster } from "react-hot-toast";
import AuthForm from "@/components/auth/auth";
import Footer from "@/components/sections/Footer";
import { AuthState } from "@/store/slices/authSlice"; // interface type imports

export default function Layout({ children }: { children: React.ReactNode }) {
  const authVisible = useSelector((state: { Auth: AuthState }) => state.Auth);

  return (
    <AuthLayer>
      <Header />
      <Toaster position="top-center" reverseOrder={false} />

      {authVisible.visible ? <AuthForm /> : ""}

      <main className=" w-full h-auto flex justify-center ">
        <div className=" max-w-5xl w-full h-auto flex flex-col ">
          {children}
        </div>
      </main>

      <Footer />
    </AuthLayer>
  );
}
