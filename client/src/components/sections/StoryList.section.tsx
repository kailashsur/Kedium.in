import React from "react";
import StoryCard from "./StoryCard";
import { Blog } from "@/Types/BlogPost";

function StoryList({ blogs }: { blogs: Array<Blog> }) {
  return (
    <section className=" py-4 ">
      {blogs.map((blog, index) => (
        <StoryCard key={index} blog={blog} />
      ))}
    </section>
  );
}

export default StoryList;
