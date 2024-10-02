import React, { useState } from "react";
import { motion } from "framer-motion";

const LikeButton = ({ total_likes }: { total_likes: number }) => {
  const [likes, setLikes] = useState(total_likes);
  const [isLiked, setIsLiked] = useState(false);

  const handelLike = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
  };

  return (
    <div
      onClick={handelLike}
      className=" w-4 flex items-center gap-2 px-4 py-2 rounded-full text-textGrey  sm:border-none hover:text-black transition-all duration-300 ease-in-out cursor-pointer select-none"
    >
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{
          scale: 0.8,
          borderRadius: "100%",
        }}
      >
        {" "}
        {isLiked ? "💝" : "🤍"}{" "}
      </motion.div>
      <div className="">{likes}</div>
    </div>
  );
};

export default LikeButton;
