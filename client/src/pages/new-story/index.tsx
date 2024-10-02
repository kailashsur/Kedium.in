import style from "./editor.module.css";
import RichTextEditor from "@/components/RichTextEditor";
import Head from "next/head";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import Image, { StaticImageData } from "next/image";
import ProfileTogle from "@/components/ProfileTogle";
import AuthWrap from "@/Layout/AuthWrap";
import Loader from "@/components/ui/loader";
import PublishCard from "@/components/PublishCard";
import { nanoid } from "nanoid";
import { default_color } from "@/styles/DefaultColor";
import { UserState } from "@/store/slices/userSlice";
import EditorNav from "@/components/EditorNav.component";
import profile from "@/images/profile.png";
import Logo from "@/images/logo.png";

// Blog interface
export interface BlogType {
  blog_id: string;
  title: string;
  thambnail: string;
  description: string;
  content: string;
  tags: string[];
  draft: boolean;
}

export const BlogDataStructure: BlogType = {
  blog_id: "", //slug
  title: "",
  thambnail: "",
  description: "",
  content: "",
  tags: [], //Array of string tags
  draft: false,
};

export default function NewStory() {
  const { data: userData, info } = useSelector(
    (state: { User: UserState }) => state.User,
  );
  const [color, setColor] = useState<string>(default_color);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [toglePublishCard, setToglePublishCard] = useState(false);
  const [slugID, setSlugID] = useState<string>(nanoid().toLowerCase());
  const [blog, setBlog] = useState<BlogType>(BlogDataStructure);
  const [bodyContent, setBodyContent] = useState<string>("");

  // Toggle handling method
  const handelTogle = useCallback(() => setIsOpen((prev) => !prev), []);

  // Handle form submission
  const handleNext = useCallback(() => setToglePublishCard(true), []);

  // Sync blog content with editor body content
  useEffect(() => {
    setBlog((prevBlog) => ({ ...prevBlog, content: bodyContent }));
  }, [bodyContent]);

  // Redirect to signup if user is not authenticated
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!userData?.access_token) {
        window.location.href = "/u/signup";
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [userData?.access_token]);

  // Profile Image handling
  const profileImage: StaticImageData | string =
    info?.profile?.profile_img || profile;

  return (
    <AuthWrap>
      {userData?.access_token ? (
        <>
          <Head>
            <title>Edit - {blog?.title || "New Story"}</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          {/* Navbar */}
          <EditorNav
            blog={blog}
            handleNext={handleNext}
            color={color}
            profileImage={profileImage}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            handelTogle={handelTogle}
          />

          {/* Editor */}
          <div
            className={`min-h-screen flex flex-col items-center font-Mori text-primary-text ${style.editor}`}
          >
            <div className="w-full max-w-3xl p-4 border">
              {/* Title Editor */}
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={blog?.title}
                onChange={(e) =>
                  setBlog((prevBlog) => ({
                    ...prevBlog,
                    title: e.target.value,
                    blog_id: e.target.value
                      .concat(" ", slugID)
                      .replace(/\s+/g, "-")
                      .toLowerCase(),
                  }))
                }
                className="font-Mori bg-transparent text-3xl border-l border-l-black/30 p-2 w-full outline-none"
              />

              {/* Text Editor */}
              <RichTextEditor value={bodyContent} setValue={setBodyContent} />
            </div>
          </div>

          {/* Publish Card */}
          {toglePublishCard && (
            <PublishCard
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
          )}
        </>
      ) : (
        <Loader />
      )}
    </AuthWrap>
  );
}
