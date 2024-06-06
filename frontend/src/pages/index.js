import { Inter } from "next/font/google";

// React imports
import { useSelector } from "react-redux";

// Component imports

import AuthForm from "@/components/auth/auth";
import Layout from "./Layout";

import AuthLayer from "./AuthLayer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const authVisible = useSelector((state) => state.Auth);

  return (
    <AuthLayer>
      <Layout>
        <main
          className={`  h-full w-full flex min-h-screen flex-col   ${inter.className}`}
        >
          {authVisible.visible ? <AuthForm /> : ""}
        </main>
      </Layout>
    </AuthLayer>
  );
}
