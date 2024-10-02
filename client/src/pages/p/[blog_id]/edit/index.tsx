import AuthLayer from "@/Layout/AuthLayer";
import { UserState } from "@/store/slices/userSlice";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Author } from "@/Types/BlogPost";
import { useState, useEffect } from "react";
import Editor from "@/components/Editor";
import Loader from "@/components/ui/loader";
import Head from "next/head";
import EditorNav from "@/components/EditorNav.component";
import { BlogDataStructure, BlogType } from "@/pages/new-story";
import { default_color } from "@/styles/DefaultColor";
import { StaticImageData } from "next/image";
import profile from "@/images/profile.png";
import UpdateCard from "@/components/UpdateCard";

const GET_QUERY = gql`
  query GetUserBlogs($blog_id: String!) {
    getUserBlog(blog_id: $blog_id) {
      title
      blog_id
      thambnail
      description
      content
      tags
      author {
        fullname
        username
        profile {
          profile_img
          profile_color
        }
      }
      draft
      publishedAt
      updatedAt
    }
  }
`;

interface Blog {
  blog_id: string;
  title: string;
  thambnail: string;
  description: string;
  content: string;
  tags: string[];
  draft: boolean;
  publishedAt: string;
  updatedAt: string;
  author: Author;
}

export default function Edit() {
  const router = useRouter();
  const userData = useSelector((state: { User: UserState }) => state.User.data);
  const { info } = useSelector((state: { User: UserState }) => state.User);
  const { blog_id } = router.query;
  const { loading, error, data } = useQuery(GET_QUERY, {
    variables: { blog_id: blog_id },
    skip: !userData, // Skip the query if userData is not loaded yet
  });

  const [color, setColor] = useState<string>(default_color);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [toglePublishCard, setToglePublishCard] = useState(false);

  const [blog, setBlog] = useState<Blog | BlogType>(BlogDataStructure);
  const [slugID, setSlugID] = useState(blog.blog_id);

  const [bodyContent, setBodyContent] = useState("");

  // togle handel method
  function handelTogle() {
    setIsOpen(!isOpen);
  }
  // Post form submit function
  function handleNext() {
    setToglePublishCard(true);
  }

  useEffect(() => {
    if (userData && !loading && data) {
      setBlog(data.getUserBlog);
    }
  }, [userData, loading, data, router.query.blog_id, router]);
  if (error) {
    setTimeout(() => {
      router.replace(`/@${userData.username}`);
    }, 3000);
  }

  // Profile Image configuration
  const [profileImage, setProfileImage] = useState<StaticImageData | string>(
    profile,
  );
  useEffect(() => {
    if (info?.profile?.profile_img) {
      setProfileImage(info?.profile?.profile_img);
    } else {
      setProfileImage(profileImage);
    }
  }, [info, profileImage]);
  return (
    <AuthLayer>
      {loading && <Loader />}
      {error && (
        <div className=" text-red-400 font-bold text-center px-4 ">
          <i className="fi fi-sr-exclamation text-xl mx-2"></i>
          {String(error)}
        </div>
      )}

      <Head>
        <title>Edit - {blog?.title} </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Navbar start */}
      <EditorNav
        blog={blog}
        handleNext={handleNext}
        color={color}
        profileImage={profileImage}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handelTogle={handelTogle}
      />
      {/* navbar ends */}
      {blog && <Editor blog={blog} setBlog={setBlog} bodyContent={bodyContent} setBodyContent={setBodyContent}  type="edit" />}

      {/* Publish Card */}
      {toglePublishCard ? (
        <UpdateCard
          blog={blog}
          setBlog={setBlog}
          userData={userData}
          togle={toglePublishCard}
          setTogle={setToglePublishCard}
          info={info}
          slugID={slugID}
          setSlugID={setSlugID}
          color={color}
        />
      ) : null}
    </AuthLayer>
  );
}
