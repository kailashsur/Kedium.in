import Image from "next/image";
import { useState } from "react";

export default function Interaction() {
  const [like, setLike] = useState(false);
  const [likeCound, setLikeCount] = useState(0);

  function handelLike() {
    setLike(!like);
    setLikeCount(likeCound + 1);

    setTimeout(() => {
      setLike(false);
    }, 500);
  }

  return (
    <div className=" flex items-center gap-2 sm:justify-between sm:border-y py-2 ">
      {/* for desktop */}
      <div className="hidden sm:flex items-center gap-2">
        {/* Clap or like button */}
        <button
          onClick={handelLike}
          className="flex text-sm items-center gap-2 px-4 py-2 rounded-full text-textGrey border sm:border-none hover:text-black transition-all duration-300 ease-in-out "
        >
          <Image
            src={`${!like ? "/images/clapping-hands-static.png" : "/images/clapping-hands.png"}`}
            width={24}
            height={24}
            alt="clap"
          />
          <span>{likeCound}</span>
        </button>
      </div>

      {/* For mobile screen  */}
      <div className="flex items-center gap-2">
        {/* Listen Button */}
        <button className="flex items-center gap-2 px-4 py-2 rounded-full text-textGrey border sm:border-none hover:text-black transition-all duration-300 ease-in-out ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0m9-10C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2m3.376 10.416-4.599 3.066a.5.5 0 0 1-.777-.416V8.934a.5.5 0 0 1 .777-.416l4.599 3.066a.5.5 0 0 1 0 .832"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>Listen</span>
        </button>

        {/* Share Button */}
        <button className="flex items-center gap-2 px-4 py-2 rounded-full text-textGrey border sm:border-none hover:text-black transition-all duration-300 ease-in-out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M15.218 4.931a.4.4 0 0 1-.118.132l.012.006a.45.45 0 0 1-.292.074.5.5 0 0 1-.3-.13l-2.02-2.02v7.07c0 .28-.23.5-.5.5s-.5-.22-.5-.5v-7.04l-2 2a.45.45 0 0 1-.57.04h-.02a.4.4 0 0 1-.16-.3.4.4 0 0 1 .1-.32l2.8-2.8a.5.5 0 0 1 .7 0l2.8 2.79a.42.42 0 0 1 .068.498m-.106.138.008.004v-.01zM16 7.063h1.5a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-11c-1.1 0-2-.9-2-2v-10a2 2 0 0 1 2-2H8a.5.5 0 0 1 .35.15.5.5 0 0 1 .15.35.5.5 0 0 1-.15.35.5.5 0 0 1-.35.15H6.4c-.5 0-.9.4-.9.9v10.2a.9.9 0 0 0 .9.9h11.2c.5 0 .9-.4.9-.9v-10.2c0-.5-.4-.9-.9-.9H16a.5.5 0 0 1 0-1"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}
