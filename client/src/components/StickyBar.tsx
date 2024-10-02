import { useEffect, useState, useCallback } from "react";
import Interaction from "./Interaction.component";
import LikeButton from "./ui/LikeButton";
import ListenButton from "./ui/Listen-button";
import ShareButton from "./ui/Share-button";
import ReadingList from "./ui/Reading-List";
import CommentButton from "./ui/comment-button";

interface StickyBarProps {
  activity: any; // Replace 'string' with the actual type of the 'activity' prop
}

const StickyBar: React.FC<StickyBarProps> = ({ activity }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div
      className={` px-4 py-2 flex items-center justify-evenly gap-8 sm:hidden  bg-primary-background border-t border-primary-text/10 fixed bottom-0 left-0 right-0 text-primary-dart-background transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <LikeButton total_likes={activity.total_likes} />
      <CommentButton/>
      <ShareButton/>
      <ReadingList/>
    </div>
  );
};

export default StickyBar;
