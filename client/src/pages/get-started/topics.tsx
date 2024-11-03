import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/Layout/Layout";
import Link from "next/link";



const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  

  return (
    
      <div className=" pt-28">

      <h1 className=" bg-lime-500">Hello home page</h1>
      
        <Link href="/u/auth">
        Go to Auth
        </Link>
     
      </div>
  
  );
}


