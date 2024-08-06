import RichTextEditor from "@/components/RichTextEditor";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/images/logo.png";
import profile from "@/images/profile.png";
import ProfileTogle from "@/components/ui/ProfileTogle";
import AuthWrap from "../AuthWrap";
import Loader from "@/components/ui/loader";
import PublishCard from "@/components/PublishCard";
import { nanoid } from "nanoid";
import { default_color } from "@/styles";

const BlogDataStructure = {
  blog_id: "", //slug
  title: "",
  thambnail: "",
  description: "",
  content: "",
  tags: [],   //Array of string tags
  draft: false
}

export default function NewStory() {
  const userData = useSelector((state) => state.User.data);
  const { info } = useSelector(state => state.User);
  const [color, setColor] = useState(default_color)
  const [isOpen, setIsOpen] = useState(false);
  const [toglePublishCard, setToglePublishCard] = useState(false);


  const [slugID, setSlugID] = useState("")
 

  // Blog states
  const [blog, setBlog] = useState(BlogDataStructure);
  const [bodyContent, setBodyContent] = useState("");

  
  // togle handel method
  function handelTogle() {
    setIsOpen(!isOpen);
  }
  // Post form submit function
  function handleNext() {
    setToglePublishCard(true)
  }



  // useEffect methods

  useEffect(() => {
    setBlog({ ...blog, content: bodyContent });
  }, [bodyContent])

  useEffect(() => {
    setTimeout(() => {
      if (!userData?.access_token) {
        window.location.href = "/u/signup";
      }
    }, 1000);


    setColor(info?.profile?.profile_color)
  }, []);


  // Profile Image configuration
  const [profileImage, setProfileImage] = useState(profile);
  useEffect(() => {
    if (info?.profile?.profile_img) {

      setProfileImage(info?.profile?.profile_img)
    }
    else {
      setProfileImage(profileImage)
    }
  }, [info])

  useEffect(() => {
    setSlugID(nanoid().toLowerCase())
}, [])



  return (
    <AuthWrap>
      {userData?.access_token ? (
        <>
          <Head>
            <title>Edit - {blog?.title} </title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          {/* Navbar start */}
          <nav className="w-full p-4 flex justify-between items-center ">
            <div className="flex gap-3 justify-center items-center ">
              <Link href={"/"}>
                <Image src={Logo} alt="logo" height={48} />
              </Link>

              <p> {"Draft"} </p>
            </div>

            <div className=" flex gap-4">
              <button
                className={`px-4 mx-2 text-sm bg-purple-700 text-white rounded-full disabled:opacity-40`}
                style={{ backgroundColor: color }}
                disabled={blog?.title || !blog?.title == "" ? false : true}
                onClick={handleNext}
              >
                Next
              </button>

              {/* three dot */}
              <div>
                <svg className="svgIcon-use" width="25" height="25">
                  <path
                    d="M5 12.5c0 .552.195 1.023.586 1.414.39.39.862.586 1.414.586.552 0 1.023-.195 1.414-.586.39-.39.586-.862.586-1.414 0-.552-.195-1.023-.586-1.414A1.927 1.927 0 007 10.5c-.552 0-1.023.195-1.414.586-.39.39-.586.862-.586 1.414zm5.617 0c0 .552.196 1.023.586 1.414.391.39.863.586 1.414.586.552 0 1.023-.195 1.414-.586.39-.39.586-.862.586-1.414 0-.552-.195-1.023-.586-1.414a1.927 1.927 0 00-1.414-.586c-.551 0-1.023.195-1.414.586-.39.39-.586.862-.586 1.414zm5.6 0c0 .552.195 1.023.586 1.414.39.39.868.586 1.432.586.551 0 1.023-.195 1.413-.586.391-.39.587-.862.587-1.414 0-.552-.196-1.023-.587-1.414a1.927 1.927 0 00-1.413-.586c-.565 0-1.042.195-1.432.586-.39.39-.586.862-.587 1.414z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>

              {/* notification */}
              <div>
                <svg
                  className="svgIcon-use"
                  width="25"
                  height="25"
                  viewBox="-293 409 25 25"
                >
                  <path d="M-273.327 423.67l-1.673-1.52v-3.646a5.5 5.5 0 00-6.04-5.474c-2.86.273-4.96 2.838-4.96 5.71v3.41l-1.68 1.553c-.204.19-.32.456-.32.734V427a1 1 0 001 1h3.49a3.079 3.079 0 003.01 2.45 3.08 3.08 0 003.01-2.45h3.49a1 1 0 001-1v-2.59c0-.28-.12-.55-.327-.74zm-7.173 5.63c-.842 0-1.55-.546-1.812-1.3h3.624a1.92 1.92 0 01-1.812 1.3zm6.35-2.45h-12.7v-2.347l1.63-1.51c.236-.216.37-.522.37-.843v-3.41c0-2.35 1.72-4.356 3.92-4.565a4.353 4.353 0 014.78 4.33v3.645c0 .324.137.633.376.85l1.624 1.477v2.373z"></path>
                </svg>
              </div>

              {/* Profile Pi */}
              {/* Profile icon */}
              <div className="relative">
                <div className="relative" onClick={handelTogle}>
                  <Image
                    src={profileImage}
                    alt="Profile Image"
                    className="rounded-full border-[1px] border-profileGrey"
                    width={32}
                    height={32}
                  />
                </div>
                <ProfileTogle isOpen={isOpen} setIsOpen={setIsOpen} />
              </div>
            </div>
          </nav>
          {/* navbar ends */}

          <main className="min-h-screen flex flex-col items-center">
            <div className="w-full max-w-3xl p-4 border">
{/* Title editor */}
              <input type="text"
                name="title"
                placeholder="Title"
                value={blog?.title}
                onChange={(e) => setBlog({ ...blog, title: e.target.value,

                  blog_id: e.target.value.concat(" ", slugID.toLocaleLowerCase()).replace(/\s+/g, '-').toLowerCase()
                 })}
                className=" font-Charter text-3xl border-l border-l-black/30 p-2 w-full outline-none" />
              
              {/* Text Editor */}
              <RichTextEditor value={bodyContent} setValue={setBodyContent} userData={userData} />
            </div>
          </main>

          {/* Publish Card */}
          {
            toglePublishCard ?
            <PublishCard blog={blog} setBlog={setBlog} userData={userData} togle={toglePublishCard} setTogle={setToglePublishCard} info={info} slugID={slugID} setSlugID={setSlugID} color={color} />
            : null
          }
        </>
      ) : (
        <Loader />

      )}
    </AuthWrap>
  );
}
