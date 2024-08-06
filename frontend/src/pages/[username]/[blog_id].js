import { Inter } from "next/font/google";
import Loader from "@/components/ui/loader";
import NotFound from "@/components/ui/NotFound";
import { gql } from "@apollo/client";
import { initializeApollo } from "@/apollo/apolloClient.js";
import { useRouter } from "next/router";
import Layout from "../Layout";
import Head from "next/head";
import Image from "next/image";
import profile from "@/images/profile.png";
import Content from "@/components/Content";
import style from "./main.module.css";
import Interaction from "@/components/interaction.component";

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
        fullname
        email
        _id
      }
      activity {
        total_reads
        total_likes
        total_comments
      }
      _id
    }
  }
`;

const inter = Inter({ subsets: ["latin"] });

const BlogPost = ({ blogData }) => {
  const router = useRouter();

  if (!blogData?.getBlog) {
    return <NotFound />;
  }

  const { title, thumbnail, tags, publishedAt, description, author, activity } =
    blogData?.getBlog;

  return (
    <>
      <Head>
        <title>{`${title} - ${author.fullname}`}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={tags.join(", ")} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={thumbnail} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={publishedAt} />
        <meta property="article:author" content={author.fullname} />
      </Head>

      <Layout>
        <div className={`w-full ${inter.className} ${style.blog}`}>
          <article className="w-full px-4 flex flex-col items-center">
            <header className="mb-8 w-full md:w-[680px]">
              {/* Title of the post */}
              <h1 className="text-3xl font-bold mt-10 my-8">{title}</h1>
              {/* Author card */}
              <div className="w-full flex my-4 py-2">
                <Image
                  src={author?.profile?.profile_img || profile}
                  alt={author.fullname}
                  className="rounded-full"
                  width={44}
                  height={44}
                />
                <div className="text-base flex justify-center items-center capitalize gap-4 ml-4">
                  <p>{author.fullname}</p>
                  <button className="text-purple-700">Follow</button>
                </div>
              </div>
              {/* Activity */}
              <Interaction activity={activity} />

              {/* Thumbnail */}
              {thumbnail && (
                <Image
                  src={thumbnail}
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
          </article>
        </div>
      </Layout>
    </>
  );
};

export default BlogPost;

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo();
  const { data: blogData } = await apolloClient.query({
    query: GET_BLOG_QUERY,
    variables: {
      blog_id: params.blog_id,
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
  // Optionally fetch and return paths for pre-rendering
  return {
    paths: [],
    fallback: "blocking",
  };
}
