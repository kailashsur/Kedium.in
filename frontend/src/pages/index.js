import { Inter } from "next/font/google";

import Layout from "./Layout";

import AuthLayer from "./AuthLayer";
import { useSession, signIn, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "@/store/slices/userSlice";



const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const { data: session, data } = useSession();



  return (
    <AuthLayer>
      <Layout>
        <main
          className={`h-auto w-full flex flex-col   ${inter.className}`}
        >

          

        </main>
      </Layout>
    </AuthLayer>
  );
}
