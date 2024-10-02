import { Inter } from "next/font/google";
import Loader from "@/components/ui/loader";
import NotFound from "@/components/NotFound";
import { gql } from "@apollo/client";
import { initializeApollo } from "@/apollo/apolloClient";
import { useRouter } from "next/router";
import Layout from "@/Layout/Layout";
import Head from "next/head";
import Image from "next/image";
import profile from "@/images/profile.png";
import Content from "@/components/sections/Content";
import Interaction from "@/components/Interaction.component";
import { BlogPostProps } from "@/Types/BlogPost";
import { GetStaticPropsContext } from "next";
import StickyBar from "@/components/StickyBar";
import CommentButton from "@/components/ui/comment-button";
import BlueTick from "@/components/ui/BlueTick";
import InteractionBottom from "@/components/Interaction.bottom.component";
import Link from "next/link";
import FollowButton from "@/components/Follow.component";
import { useSelector } from "react-redux";
import { UserState } from "@/store/slices/userSlice";

// define type

// GraphQL queries
const GET_BLOG_QUERY = gql`
  query GetBlog($blog_id: String!) {
    getBlog(blog_id: $blog_id) {
      title
      updatedAt
      thambnail
      tags
      publishedAt
      draft
      description
      content
      blog_id
      author {
        username
        profile {
          profile_img
          profile_color
          bio
        }
        verified
        fullname
        email
        _id
      }
      activity {
        total_reads
        total_likes
        total_comments
      }
    }
  }
`;

const inter = Inter({ subsets: ["latin"] });

const BlogPost = ({ blogData }: { blogData: BlogPostProps }) => {
  const router = useRouter();
  const userData = useSelector((state: { User: UserState }) => state.User);

  if (!blogData?.getBlog) {
    return <NotFound />;
  }

  const { title, thambnail, tags, publishedAt, description, author, activity } =
    blogData?.getBlog;

  // function handelEdit(e: React.MouseEvent<HTMLButtonElement>) {
  //   e.preventDefault();
  // }

  return (
    <>
      <Head>
        <title>{`${title} - ${author.fullname}`}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={tags.join(", ")} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={thambnail} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={publishedAt} />
        <meta property="article:author" content={author.fullname} />
      </Head>

      <Layout>
        <div
          className={`w-full ${inter.className} dark:bg-primary-dart-background dark:text-primary-dark-text sm:rounded-md sm:my-6 pt-6 select-none `}
        >
          <article className="w-full px-4 flex flex-col items-center">
            <header className="mb-8 w-full md:w-[680px]">
              {/* Title of the post */}
              <h1 className="text-3xl font-bold mt-10 my-8 dark:text-primary-dark-text  text-primary-text font-MoriSemiBold selection:bg-purple-400 selection:text-white">
                {title}
              </h1>
              {/* Author card */}
              <div className="w-full flex justify-between items-center my-4 py-2">
                <div className=" w-full flex">
                  {/* Author profile image */}
                  <Image
                    src={author?.profile?.profile_img || profile}
                    alt={author.fullname}
                    className="rounded-full"
                    width={44}
                    height={44}
                  />

                  {/* Author name */}
                  <div className="text-base flex justify-center items-center capitalize gap-4 ml-4 dark:text-primary-dark-text text-primary-text font-MoriSemiBold ">
                    <Link href={`/@${author.username}`} className=" flex gap-2">
                      <p>{author.fullname}</p>
                      {author?.verified && <BlueTick />}
                    </Link>

                    {/* follow button */}

                    {userData?.data?.username !== author?.username && (
                      <FollowButton
                        username={author?.username}
                        me_user={userData}
                        target_user={author}
                        className={``}
                        bg_color="bg-blue-600"
                        text_color="text-white"
                      />
                    )}
                  </div>
                </div>
                {/* Edit Article button */}
              </div>
              {/* Activity */}
              <Interaction activity={activity} />

              {/* thambnail */}
              {thambnail && thambnail !== "null" && (
                <Image
                  src={thambnail}
                  alt={title}
                  className="w-full rounded-sm mt-8"
                  width={800}
                  height={450}
                  layout="responsive"
                />
              )}
            </header>
            {/* Content section */}
            <Content content={blogData?.getBlog?.content} />

            <div className="mb-8 w-full md:w-[680px]">
              <InteractionBottom activity={activity} />
            </div>
          </article>
          <StickyBar activity={activity} />
        </div>
      </Layout>
    </>
  );
};

export default BlogPost;

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const apolloClient = initializeApollo();
  const { data: blogData } = await apolloClient.query({
    query: GET_BLOG_QUERY,
    variables: {
      blog_id: params?.blog_id,
    },
  });

  return {
    props: {
      blogData,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
}

export async function getStaticPaths() {
  // :TODO Optionally fetch and return paths for pre-rendering
  return {
    paths: [],
    fallback: "blocking",
  };
}
