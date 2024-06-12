
import { toast_theme1 } from "@/lib/hot-toast";
import { obfuscateEmail } from "@/lib/methods";
import { enable } from "@/store/slices/authSlice";
import axios from "axios";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";




function ProfileTogle({ isOpen, setIsOpen }) {

  const userData = useSelector((state) => state.User.data);
  const router = useRouter();
  const dispatch = useDispatch();


  const profileTogleRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      profileTogleRef.current &&
      !profileTogleRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handelSignout() {
    let loading = toast.loading("Logout...", toast_theme1)
    try {
      const res = await axios.get("http://localhost:3000/api/logout")
      toast.dismiss(loading)

      if (res) {
        toast.success(res, toast_theme1)
        if (router.pathname == '/') {
          router.reload();
        }
        else {
          router.push('/')
        }
      }
    } catch (error) {
      toast.dismiss(loading)

      toast.error(String(error), toast_theme1)
    }
  }

  return (


    <div
      ref={profileTogleRef}
      className={`absolute flex sm:pb-6 flex-col right-1 h-auto w-[264px] rounded-sm transition-opacity transform duration-300 ease-in-out transition-alls ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } shadow-md `}
      style={{ top: "40px" }}
    >
      {
        !userData.access_token ?
          <div>

          </div>
          : ""
      }
      <div className=" flex justify-center items-center flex-col gap-4 p-6">
        <p className=" font-semibold "
        >Get started </p>

        <button className=" text-sm bg-purple-700 text-white w-full rounded-full py-2 hover:bg-purple-800 transition-all "
          onClick={() => {
            dispatch(enable())
          }}
        >Sign up</button>

        <button className=" text-sm border border-black text-black w-full rounded-full py-2 transition-all "
          onClick={() => {
            dispatch(enable('login'))
          }}
        >Sign in</button>
      </div>


      {
        userData.access_token ?
          <>
            {/* Write Section */}
            <a href="#" className=" p-6 text-textGrey flex items-center gap-4 hover:text-black  transition-all ">

              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Write"><path d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z" fill="currentColor"></path><path d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2" stroke="currentColor"></path></svg>

              <p className=" capitalize ">write</p>
            </a>


            {/* Profile Items section */}
            <div className="mt-5 px-6 pt-0 flex flex-col gap-4">
              <a href="#" className=" text-textGrey flex items-center gap-4 hover:text-black  transition-all ">

                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Profile" className=""><circle cx="12" cy="7" r="4.5" stroke="currentColor"></circle><path d="M3.5 21.5v-4.34C3.5 15.4 7.3 14 12 14s8.5 1.41 8.5 3.16v4.34" stroke="currentColor" strokeLinecap="round"></path></svg>

                <p className="capitalize ">profile</p>
              </a>

              <a href="#" className=" text-textGrey flex items-center gap-4 hover:text-black  transition-all ">

                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Lists"><path d="M6.44 6.69h0a1.5 1.5 0 0 1 1.06-.44h9c.4 0 .78.16 1.06.44l.35-.35-.35.35c.28.28.44.66.44 1.06v14l-5.7-4.4-.3-.23-.3.23-5.7 4.4v-14c0-.4.16-.78.44-1.06z" stroke="currentColor"></path><path d="M12.5 2.75h-8a2 2 0 0 0-2 2v11.5" stroke="currentColor" strokeLinecap="round"></path></svg>

                <p className=" capitalize ">library</p>
              </a>


              <a href="#" className=" text-textGrey flex items-center gap-4 hover:text-black  transition-all ">

                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Stories"><path d="M4.75 21.5h14.5c.14 0 .25-.11.25-.25V2.75a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25v18.5c0 .14.11.25.25.25z" stroke="currentColor"></path><path d="M8 8.5h8M8 15.5h5M8 12h8" stroke="currentColor" strokeLinecap="round"></path></svg>

                <p className="capitalize ">stories</p>
              </a>


              <a href="#" className=" text-textGrey flex items-center gap-4 hover:text-black  transition-all ">

                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Stats"><path d="M2.75 19h4.5c.14 0 .25-.11.25-.25v-6.5a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25v6.5c0 .14.11.25.25.25zM9.75 19h4.5c.14 0 .25-.11.25-.25V8.25a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25v10.5c0 .14.11.25.25.25zM16.75 19h4.5c.14 0 .25-.11.25-.25V4.25a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25v14.5c0 .14.11.25.25.25z" stroke="currentColor"></path></svg>

                <p className=" capitalize ">stats</p>
              </a>
            </div>

            <hr className=" my-5 border-borderGrey" />
            {/* Settings Section */}
            <div className=" px-6 pt-0 flex flex-col gap-4">
              <a href="#" className=" text-textGrey flex items-center gap-4 hover:text-black hover:font-normal transition-all capitalize text-sm ">
                settings
              </a>

              <a href="#" className=" text-textGrey flex items-center gap-4 hover:text-black hover:font-normal transition-all capitalize text-sm ">
                Refine recommendations
              </a>

              <a href="#" className=" text-textGrey flex items-center gap-4 hover:text-black hover:font-normal transition-all capitalize text-sm ">
                Manage publications
              </a>

              <a href="#" className=" text-textGrey flex items-center gap-4 hover:text-black hover:font-normal transition-all capitalize text-sm ">
                help
              </a>
            </div>
          </>
          : ""
      }

      <hr className=" my-5 border-borderGrey" />
      {/* Verification and membership section */}
      <div className=" px-6 pt-0 flex flex-col gap-4">
        <a href="#" className=" text-textGrey flex items-center gap-4 hover:text-black hover:font-normal transition-all text-sm ">
          Become a Member

          <svg width="18" height="18" viewBox="0 0 64 64" fill="none" role="presentation" aria-hidden="true" focusable="false" className="og dr"><path d="M39.64 40.83L33.87 56.7a1.99 1.99 0 0 1-3.74 0l-5.77-15.87a2.02 2.02 0 0 0-1.2-1.2L7.3 33.88a1.99 1.99 0 0 1 0-3.74l15.87-5.77a2.02 2.02 0 0 0 1.2-1.2L30.12 7.3a1.99 1.99 0 0 1 3.74 0l5.77 15.87a2.02 2.02 0 0 0 1.2 1.2l15.86 5.76a1.99 1.99 0 0 1 0 3.74l-15.87 5.77a2.02 2.02 0 0 0-1.2 1.2z" fill="#FFC017"></path></svg>
        </a>
        <a href="#" className=" text-textGrey flex items-center gap-4 hover:text-black hover:font-normal transition-all text-sm ">
          Apply for author verification
        </a>

        <a href="#" className=" text-textGrey flex items-center gap-4 hover:text-black hover:font-normal transition-all text-sm ">
          Apply to the Partner Program
        </a>

      </div>

      {/* login and signup section */}

      {
        userData.access_token ?
          <>
            <hr className=" my-5 border-borderGrey" />
            <div className=" px-6 pt-0 flex flex-col gap-4">
              <button
                onClick={handelSignout}
                className=" text-textGrey text-start gap-4 hover:text-black hover:font-normal transition-all text-sm ">
                <p>Sign out</p>
                <p>{obfuscateEmail(userData.email)}</p>
              </button>
            </div>
          </>
          : ""
      }



      <div className=" p-6 bg-[#f9f9f9] mt-5 text-sm text-textGrey sm:hidden flex flex-wrap gap-2 ">
        <a>Status</a>
        <a>About</a>
        <a>Blog</a>
        <a>Privacy </a>
        <a>Terms</a>
        <a>Teams</a>
      </div>
    </div>

  );
}

export default ProfileTogle;


