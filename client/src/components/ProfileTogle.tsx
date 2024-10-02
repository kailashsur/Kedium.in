import { SignOut } from "@/lib/auth-methods";
import { toast_theme1 } from "@/lib/hot-toast";
import { obfuscateEmail } from "@/lib/methods";
import { enable } from "@/store/slices/authSlice";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

// next auth
import { signOut } from "next-auth/react";
import { UserState } from "@/store/slices/userSlice";

import {
  library_icon,
  profile_icon,
  stats_icon,
  stories_icon,
} from "@/asets/icons";

function ProfileTogle({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const userData = useSelector((state: { User: UserState }) => state.User.data);
  const router = useRouter();

  const { asPath } = router;
  const dispatch = useDispatch();

  const profileTogleRef = useRef(null);

  function handelSignup(): void {
    dispatch(enable("signup"));
  }

  // const handleClickOutside = (event) => {
  //   if (
  //     profileTogleRef.current &&
  //     !profileTogleRef.current.contains(event.target)
  //   ) {
  //     setIsOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  async function handelSignout() {
    try {
      // Ensure signOut completes
      await SignOut();

      const res = await signOut();

      // Execute SignOut after signOut completes

      if (res) {
        toast.success(res, toast_theme1);

        if (router.pathname === "/") {
          router.reload();
        } else {
          router.push("/");
          router.reload();
        }
      }
    } catch (error) {
      console.error("Error during signout process:", error);
    }
  }

  // Scroll to down to hide
  const [lastScrollY, setLastScrollY] = React.useState(0);

  const handleScroll = React.useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      // Hide the header when scrolling down
      setIsOpen(false);
    } else {
      // Show the header when scrolling up
      setIsOpen(false);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY, setIsOpen]);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div
      className={` ${isOpen ? "block" : "hidden"} fixed top-0 left-0  p-4 h-screen w-full `}
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <div
        ref={profileTogleRef}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={` z-50 dark:bg-primary-background dark:text-primary-text  absolute backdrop-blur-lg bg-primary-background border-borderGrey flex sm:pb-6 flex-col right-6 mt-4 h-auto w-[264px] rounded-sm transition-opacity transform duration-300 ease-in-out transition-alls ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } shadow-md shadow-black/30 dark:border-primary-dark-text dark:border z-40 `}
        style={{ top: "40px" }}
      >
        {!userData.access_token ? (
          <div className=" flex justify-center items-center flex-col gap-4 p-6">
            <p className=" font-semibold ">Get started </p>

            <button
              className=" text-sm bg-purple-700 text-white w-full rounded-full py-2 hover:bg-purple-800 transition-all "
              onClick={handelSignup}
            >
              Sign up
            </button>

            <button
              className=" text-sm border border-black text-black w-full rounded-full py-2 transition-all "
              onClick={() => {
                dispatch(enable("login"));
              }}
            >
              Sign in
            </button>
          </div>
        ) : (
          ""
        )}

        {userData.access_token ? (
          <>
            {/* Write Section */}
            <Link
              href="/new-story"
              className=" p-6 text-textGrey flex items-center gap-4 hover:primary-text  transition-all "
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-label="Write"
              >
                <path
                  d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z"
                  fill="currentColor"
                ></path>
                <path
                  d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2"
                  stroke="currentColor"
                ></path>
              </svg>

              <p className=" capitalize ">write</p>
            </Link>

            {/* Profile Items section */}
            <div className="mt-5 px-6 pt-0 flex flex-col gap-4 capitalize">
              <Link
                href={`/@${userData.username}`}
                className=" text-textGrey flex items-center gap-4 hover:primary-text  transition-all "
              >
                {/* :profile svg icon */}
                {profile_icon}

                <p className="capitalize ">profile</p>
              </Link>

              <Link
                href="/dashboard/library"
                className=" text-textGrey flex items-center gap-4 hover:primary-text  transition-all "
              >
                {/* :library svg icon */}
                {library_icon}

                <p className=" capitalize ">library</p>
              </Link>

              <Link
                href={"/dashboard/stories"}
                className=" text-textGrey flex items-center gap-4 hover:primary-text  transition-all "
              >
                {/* :stories svg icon */}
                {stories_icon}

                <p className="capitalize ">stories</p>
              </Link>

              <Link
                href="/dashboard"
                className=" text-textGrey flex items-center gap-4 hover:primary-text  transition-all "
              >
                {/* :stats svg icon */}
                {stats_icon}

                <p className=" capitalize ">stats</p>
              </Link>
            </div>

            <hr className=" my-5 border-borderGrey" />
            {/* Settings Section */}
            <div className=" px-6 pt-0 flex flex-col gap-4">
              <a
                href="#"
                className=" text-textGrey flex items-center gap-4 hover:primary-text hover:font-normal transition-all capitalize text-sm "
              >
                settings
              </a>

              <a
                href="#"
                className=" text-textGrey flex items-center gap-4 hover:primary-text hover:font-normal transition-all capitalize text-sm "
              >
                Refine recommendations
              </a>

              <a
                href="#"
                className=" text-textGrey flex items-center gap-4 hover:primary-text hover:font-normal transition-all capitalize text-sm "
              >
                Manage publications
              </a>

              <a
                href="#"
                className=" text-textGrey flex items-center gap-4 hover:primary-text hover:font-normal transition-all capitalize text-sm "
              >
                help
              </a>
            </div>
          </>
        ) : (
          ""
        )}

        <hr className=" my-5 border-borderGrey" />
        {/* Verification and membership section */}
        <div className=" px-6 pt-0 flex flex-col gap-4">
          <a
            href="#"
            className=" text-textGrey flex items-center gap-4 hover:primary-text hover:font-normal transition-all text-sm "
          >
            Become a Member
            <svg
              width="18"
              height="18"
              viewBox="0 0 64 64"
              fill="none"
              role="presentation"
              aria-hidden="true"
              focusable="false"
              className="og dr"
            >
              <path
                d="M39.64 40.83L33.87 56.7a1.99 1.99 0 0 1-3.74 0l-5.77-15.87a2.02 2.02 0 0 0-1.2-1.2L7.3 33.88a1.99 1.99 0 0 1 0-3.74l15.87-5.77a2.02 2.02 0 0 0 1.2-1.2L30.12 7.3a1.99 1.99 0 0 1 3.74 0l5.77 15.87a2.02 2.02 0 0 0 1.2 1.2l15.86 5.76a1.99 1.99 0 0 1 0 3.74l-15.87 5.77a2.02 2.02 0 0 0-1.2 1.2z"
                fill="#FFC017"
              ></path>
            </svg>
          </a>
          <a
            href="#"
            className=" text-textGrey flex items-center gap-4 hover:primary-text hover:font-normal transition-all text-sm "
          >
            Apply for author verification
          </a>

          <a
            href="#"
            className=" text-textGrey flex items-center gap-4 hover:primary-text hover:font-normal transition-all text-sm "
          >
            Apply to the Partner Program
          </a>
        </div>

        {/* login and signup section */}

        {userData.access_token ? (
          <>
            <hr className=" my-5 border-borderGrey" />
            <div className=" px-6 pt-0 flex flex-col gap-4">
              <button
                onClick={handelSignout}
                className=" text-textGrey text-start gap-4 hover:primary-text hover:font-normal transition-all text-sm "
              >
                <p>Sign out</p>
                <p>{obfuscateEmail(userData.email || "")}</p>
              </button>
            </div>
          </>
        ) : (
          ""
        )}

        <div className=" p-6 bg-[#f9f9f9] mt-5 text-sm text-textGrey sm:hidden flex flex-wrap gap-2 ">
          <a>Status</a>
          <a>About</a>
          <a>Blog</a>
          <a>Privacy </a>
          <a>Terms</a>
          <a>Teams</a>
        </div>
      </div>
    </div>
  );
}

export default ProfileTogle;
