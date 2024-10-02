import { StaticImageData } from "next/image";
import React, { useState } from "react";
import Image from "next/image";
import ShareButton from "../ui/Share-button";
import ReadingList from "../ui/Reading-List";
import Link from "next/link";
import { Blog } from "@/Types/BlogPost";
import { formatDate } from "@/lib/methods";
// href={`/@${blog.author.username}/${blog?.blog_id}`}
function StoryCard({ blog }: { blog: Blog }) {
  const [slug, setSlug] = useState<string>(
    `/@${blog?.author?.username}/${blog?.blog_id}`,
  );
  const [organization, setOrganization] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | StaticImageData>(
    blog?.author?.profile?.profile_img != "" &&
      blog?.author?.profile?.profile_img != null
      ? blog?.author?.profile?.profile_img
      : "https://avatar.iran.liara.run/public",
  );
  const [fullname, setFullname] = useState<string>(
    blog?.author?.fullname || "",
  );
  const [title, setTitle] = useState<string>(blog?.title);
  const [description, setDescription] = useState<string>(blog?.description);
  const [thambnail, setThambnail] = useState<string | StaticImageData>(
    blog?.thambnail,
  );
  const [updatedAt, setUpdatedAt] = useState<string>(blog?.updatedAt);
  const [likes, setLikes] = useState<number>(blog?.activity?.total_likes || 0);
  const [comments, setComments] = useState<number>(
    blog?.activity?.total_comments || 0,
  );

  return (
    <div className=" select-none py-4 border-b border-primary-text/20 flex flex-col font-Mori">
      {/* Profile */}
      <div className=" mb-4 text-sm flex items-center gap-2">
        {/* Avatar */}
        <Image
          className="rounded-full"
          src={avatar}
          alt="avatar"
          width={20}
          height={20}
        />
        {/* Fullname */}
        <p className="capitalize text-sm">{fullname}</p>
        {/* Organization */}
        {organization ? <p> in {organization}</p> : null}
      </div>

      <div className=" flex flex-col justify-between items-start gap-2">
        <div className=" w-full flex justify-between items-start font-Mori ">
          {/* Story */}
          <Link href={slug}>
            {/* Title */}
            <p className=" text-xl text-primary-text font-bold line-clamp-3">
              {title}
            </p>
            {/* Description */}
            <p className=" text-sm text-primary-text font-light my-2 line-clamp-2">
              {description}
            </p>
          </Link>
          {/* Thambnail */}
          {thambnail &&
            thambnail != null &&
            thambnail != "" &&
            thambnail != "null" && (
              <Image
                className="rounded-sm sm:w-40 sm:h-24"
                src={thambnail}
                alt="thambnail"
                width={80}
                height={54}
              />
            )}
        </div>

        {/* Actions */}
        <div className=" w-full flex justify-between mt-2 items-center text-sm">
          <span className="flex gap-4 text-sm">
            {/* UpdatedAt */}
            <span>{formatDate(updatedAt)}</span>
            {/* Likes */}
            <span className=" flex items-center justify-center gap-2">
              <i className="fi fi-sr-heart"></i>
              <span>{likes}</span>
            </span>
            {/* Comments */}
            <span className=" flex items-center justify-center gap-2">
              <i className="fi fi-sr-comment-alt"></i>
              <span>{comments}</span>
            </span>
          </span>

          <span className=" flex justify-end items-center">
            <ShareButton />
            <ReadingList />
          </span>
        </div>
      </div>
    </div>
  );
}

export default StoryCard;
