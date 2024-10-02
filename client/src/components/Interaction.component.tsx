// Desc: This file contains the interaction component for the blog post.
import { Activity } from "@/Types/BlogPost";
import LikeButton from "./ui/LikeButton";
import ListenButton from "./ui/Listen-button";
import ShareButton from "./ui/Share-button";

export default function Interaction({ activity, childe }: { activity: Activity, childe?: () => JSX.Element | undefined }) {
  return (
    <div className=" flex items-center gap-2 justify-between sm:border-y py-2 dark:text-primary-dark-text ">
      {/* for desktop */}
      <div className="hidden sm:flex items-center gap-8">
        <LikeButton total_likes={activity.total_likes} />
        {childe && childe()}
      </div>

      {/* For mobile screen  */}
      <div className="flex items-center gap-2">
        <ListenButton />
        <ShareButton />
      </div>
    </div>
  );
}
