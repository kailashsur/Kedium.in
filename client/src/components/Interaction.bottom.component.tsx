import React from "react";
import LikeButton from "./ui/LikeButton";
import { Activity } from "@/Types/BlogPost";
import CommentButton from "./ui/comment-button";
import ReadingList from "./ui/Reading-List";
import ShareButton from "./ui/Share-button";

export default function InteractionBottom({
  activity,
}: {
  activity: Activity;
}) {
  return (
    <div className="flex items-center gap-2 justify-between sm:border-y py-2 dark:text-primary-dark-text ">
      <div className="flex gap-4">
        <LikeButton total_likes={activity.total_likes} />
        <CommentButton />
      </div>
      <div className="flex gap-2">
        <ReadingList />
        <ShareButton />
      </div>
    </div>
  );
}
