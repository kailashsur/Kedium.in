import { BlogType } from "@/pages/new-story";
import RichTextEditor from "./RichTextEditor";
import { useSelector } from "react-redux";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { default_color } from "@/styles/DefaultColor";
import { UserState } from "@/store/slices/userSlice";
import Image from "next/image";
import style from "./sections/content.module.css"

const BlogDataStructure = {
  blog_id: "", //slug
  title: "",
  thambnail: "",
  description: "",
  content: "",
  tags: [], //Array of string tags
  draft: false,
};

function Editor({
  blog,
  setBlog,
 

  bodyContent,
  setBodyContent ,
  type = "new",
 
}: {
  blog: BlogType;
  setBlog: Function;

  bodyContent : string;
  setBodyContent : Dispatch<SetStateAction<string>>;
  type?: "new" | "edit";
}) {


  useEffect(() => {
    if (type === "edit") {
      setBlog(blog);
      setBodyContent(blog.content);
    }
  }, [blog, type]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center font-Mori text-primary-text ${style.blog}`}
    >
      <div className="w-full max-w-3xl p-4 border">
        {/* Title editor */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={blog?.title}
          onChange={(e) =>
            setBlog({
              ...blog,
              title: e.target.value,
            })
          }
          className=" font-Mori bg-transparent text-3xl border-l border-l-black/30 p-2 w-full outline-none"
        />

        {/* Description editor */}
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={blog?.description}
          onChange={(e) => setBlog({ ...blog, description: e.target.value })}
          className=" font-Mori bg-transparent text-lg border-l border-l-black/30 p-2 w-full outline-none"
        />

        {/* Thambnail */}
        <Image
          src={blog?.thambnail}
          alt={blog?.title}
          className="w-full rounded-sm mt-8"
          width={800}
          height={450}
          layout="responsive"
        />

        {/* Text Editor */}
        <RichTextEditor value={bodyContent} setValue={setBodyContent} />
      </div>
    </div>
  );
}

export default Editor;
