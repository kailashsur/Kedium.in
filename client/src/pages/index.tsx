import Image from "next/image";
import { Inter } from "next/font/google";
// ui components
import { FlipWords } from "@/components/ui/flip-words";
import Layout from "@/Layout/Layout";
import Loader from "@/components/ui/loader";
import { useSelector } from "react-redux";
import { UserState } from "@/store/slices/userSlice";
import { useQuery, gql } from "@apollo/client";

import Link from "next/link";
import { AuthState } from "@/store/slices/authSlice";
import StoryList from "@/components/sections/StoryList.section";
import { Blog } from "@/Types/BlogPost";
import LoaderForPage from "@/components/ui/Loader-for-page";

import { GetServerSideProps } from "next";

const GET_BLOGS = gql`
  query getBlogs($ip: String!) {
    getBlogs(ip: $ip) {
      blog_id
      title
      description
      thambnail
      author {
        profile {
          profile_img
        }
        fullname
        username
      }
      updatedAt
      activity {
        total_likes
        total_comments
        total_reads
      }
    }
  }
`;

interface Props {
  ip: string;
}

const inter = Inter({ subsets: ["latin"] });

export default function Home({ ip }: Props) {
  const userData = useSelector((state: { User: UserState }) => state.User.data);
  const { data, loading, error } = useQuery(GET_BLOGS, {
    variables: {
      ip: ip,
    },
  });
  const AuthVisible = useSelector(
    (state: { Auth: AuthState }) => state.Auth.visible,
  );

  // if (loading) return <Loader />;

  const words = ["Hello", "world", "from", "Next.js"];

  return (
    <Layout>
      <div
        className={`h-auto w-full flex flex-col justify-center ${inter.className}`}
      >
        <div
          className={`h-auto min-h-screen w-full flex flex-col ${inter.className} max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8`}
        >
          {/* For you top suggested posts list */}
          {data ? <StoryList blogs={data.getBlogs} /> : <LoaderForPage />}
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const req = context.req;
  const getClientIp = (req: typeof context.req): string => {
    const forwardedFor = req.headers["x-forwarded-for"] as string | undefined;
    return forwardedFor
      ? forwardedFor.split(",")[0]
      : req.socket.remoteAddress || "";
  };

  const ip = getClientIp(req);

  return {
    props: {
      ip,
    },
  };
};
