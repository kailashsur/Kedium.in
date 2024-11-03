import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/Layout/Layout";
import Link from "next/link";
import { useSelector } from "react-redux";
import { TokenState } from "@/store/slices/token.slice";
import axios from "axios";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { status, error, accessToken: token, data } = useSelector((state: { Token: TokenState }) => state.Token);


  async function handelLogout() {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_USER_API_URL}/api/v1/auth/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials : true
      });

      console.log(res);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  }

  return (
    <Layout>
      <div className=" pt-28">

        <h1 className=" bg-lime-500">Hello home page</h1>

        <Link href="/u/auth">
          Go to Auth
        </Link>

{
  token && (

    <button className="bg-purple-500 p-4 rounded-sm py-2 active:bg-green-400" onClick={handelLogout}>Logout</button>
  )
}

      </div>
    </Layout>
  );
}


