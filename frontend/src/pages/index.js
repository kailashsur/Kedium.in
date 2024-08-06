import { Inter } from "next/font/google";
import Image from "next/image";
import { useState, useRef } from "react";
import Layout from "./Layout";

import AuthLayer from "./AuthLayer";

import { useSelector } from "react-redux";
import { gql, useQuery, useMutation } from "@apollo/client";
import appwrite_client, { ID } from "@/util/appwrite/appwrite";
import conf from "@/util/appwrite/conf";
import toast from "react-hot-toast";
import Loader from "@/components/ui/loader";
import Link from "next/link";

const GET_BLOG = gql`
  query {
    getBlogs {
      blog_id
      title
      thambnail
    }
  }
`;

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const userData = useSelector((state) => state.User.data);
  const { data, loading, error } = useQuery(GET_BLOG);

  if (loading) return <Loader />;

  return (
    <Layout>
      <main
        className={`h-auto w-full flex flex-col justify-center ${inter.className}`}
      >
        <main className={`h-auto w-full flex flex-col ${inter.className}`}>
          <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            {data &&
              data.getBlogs.map((blog, index) => (
                <Link
                  href={`/@${userData.username}/${blog?.blog_id}`}
                  key={index}
                  className=" flex"
                >
                  <h1>{blog.title}</h1>
                </Link>
              ))}
          </div>
        </main>
      </main>
    </Layout>
  );
}
