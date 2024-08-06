import Image from "next/image";
import profile from "@/images/profile.png";
import Logo from "@/images/Medium.svg";
import { useEffect, useState } from "react";
import ProfileTogle from "./ProfileTogle";
import { useDispatch, useSelector } from "react-redux";
import { enable } from "@/store/slices/authSlice";
import Link from "next/link";
import SearchBox from "./SearchBox";
import { setPrevPath } from "@/store/slices/pathSlice";
import { useRouter } from "next/router";


export default function Navbar() {
  const userData = useSelector(state => state.User.data);
  const { info } = useSelector(state => state.User);
  const dispatch = useDispatch();
  const router = useRouter();
  

  // Profile Image configuration
  const [profileImage, setProfileImage] = useState(profile);
  useEffect(()=>{
    if(info?.profile?.profile_img){

      setProfileImage(info?.profile?.profile_img)
    }
    else{
      setProfileImage(profileImage)
    }
  },[info])




  // this is for togle the profile togle
  const [isOpen, setIsOpen] = useState(false);
  function handelTogle() {
    setIsOpen(!isOpen)
    // e.stopPropagation();

  }


  function handelWrite() {
    if (userData.access_token) {
      router.push('/new-story');
    } else {
      dispatch(enable("login"))
    }
  }
  function handelsignup() {
    dispatch(enable());
    dispatch(setPrevPath(router.asPath))
  }
  function handelsignin() {
    dispatch(enable('login'));
    dispatch(setPrevPath(router.asPath))
  }


  return (
    <nav className=" h-14 flex justify-between items-center pt-0 pb-0 pl-6 pr-6 bg-white border-b border-borderGrey">
      {/* Logo */}
      <div className="flex gap-4 items-center ">
        <Link href="/">
          <Image src={Logo} alt="logo" height={21} />
        </Link>


        {/* Serch box for desktop only */}
        <SearchBox className={"hidden sm:flex w-60 h-10 "} />
      </div>

      {/*----------------------------------- nav items for mobile ---------------------------------------*/}
      <div className=" flex items-center gap-6 ">
        {/* Search Icon and functionnality */}
        {/* TODO:Mobile */}

        <Link href="/search" className=" sm:hidden h-6 w-6">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-label="Search"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.1 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0zm6.94-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .8-.79l-3.74-3.73A8.05 8.05 0 0 0 11.04 3v.01z"
              fill="#767071"
            ></path>
          </svg>
        </Link>

        {/* Write icon and functionality */}
        <div onClick={handelWrite} className=" hidden sm:flex  text-defaultGrey hover:text-black gap-2 cursor-pointer">
          <div className=" h-6 w-6 transition-all cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Write"><path d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z" fill="currentColor"></path><path d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2" stroke="currentColor"></path></svg>
          </div>
          <p>Write</p>
        </div>

        {/* Notification icon and functionality */}
        {
          userData?.access_token ?

            <div className=" h-6 w-6 text-defaultGrey hover:text-black transition-all cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Notifications"><path d="M15 18.5a3 3 0 1 1-6 0" stroke="currentColor" strokeLinecap="round"></path><path d="M5.5 10.53V9a6.5 6.5 0 0 1 13 0v1.53c0 1.42.56 2.78 1.57 3.79l.03.03c.26.26.4.6.4.97v2.93c0 .14-.11.25-.25.25H3.75a.25.25 0 0 1-.25-.25v-2.93c0-.37.14-.71.4-.97l.03-.03c1-1 1.57-2.37 1.57-3.79z" stroke="currentColor" strokeLinejoin="round"></path></svg>
            </div>
            : ""
        }

        {
          !userData?.access_token ?
            <div>
              <button className=" hidden sm:inline-block text-sm py-1 px-3 text-white rounded-full bg-green-700 hover:bg-green-800 transition-all cursor-pointer"
                onClick={handelsignup}
              >
                Sign up
              </button>
              <button className=" hidden sm:inline-block text-sm py-1 px-3 text-textGrey rounded-full  hover:text-black transition-all cursor-pointer"
                onClick={handelsignin}
              >
                Sign in
              </button>
            </div>
            : ""
        }

        {/* Profile icon */}
        <div className="relative">
          <div className="relative" >
            {/* {
              profileImage ? <img 
              onClick={handelTogle}
              alt="Profile Image"
              className="rounded-full border-[1px] border-profileGrey"
              src={profileImage}
              width={32}
              height={32}
              /> :
          <Image
            onClick={handelTogle}
            src={ profile}
            alt="Profile Image"
            className="rounded-full border-[1px] border-profileGrey"
            width={32}
            height={32}
          />
            } */}
  
  <Image
            onClick={handelTogle}
            src={ profileImage}
            alt="Profile Image"
            className="rounded-full border-[1px] border-profileGrey"
            width={32}
            height={32}
          />
       
          </div>


          <ProfileTogle isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
      {/* nav item for mobile end */}
    </nav>
  );
}
