import Image from "next/image";
import { Inter } from "next/font/google";

// React imports
import { useDispatch, useSelector } from "react-redux";

// Component imports

import AuthForm from "@/components/auth/auth";
import Layout from "./Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { addUser } from "@/store/slices/userSlice";
import AuthLayer from "./AuthLayer";



const inter = Inter({ subsets: ["latin"] });



export default function Home() {

  const dispatch = useDispatch();
  const authVisible = useSelector((state) => state.Auth);
  const UserAuth = useSelector(state => state.User.data);
  // console.log("auth = ", UserAuth);

  return (
    <AuthLayer>
      <Layout>
        <main
          className={`  h-full w-full flex min-h-screen flex-col   ${inter.className}`}
        >
           {
                authVisible.visible ? <AuthForm /> : ""
            }

        </main>
      </Layout>
    </AuthLayer>
  );
}
