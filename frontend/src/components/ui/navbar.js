import Image from "next/image";
import profile from "@/images/profile.png";
import Logo from "@/images/Medium.svg";

export default function Navbar() {
  return (
    <nav className=" h-14 flex justify-between items-center pt-0 pb-0 pl-6 pr-6 bg-white border-b border-borderGrey">
      {/* Logo */}
      <div className="flex gap-4 items-center ">
        <Image src={Logo} alt="logo" height={21} />

        {/* Serch box for desktop only */}
        <div className=" hidden md:flex w-60 h-10 justify-between items-center bg-[#F9F9F9] rounded-full ">
            {/* Icon of search desktop  div24/24 */}
            <div className=" h-6 w-6 pl-3">
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
        </div>

            {/* div192w */}
            <input type="text" placeholder="Search"
            className=" w-48 border-none focus:border-none focus:outline-none active:border-none pt-2 pb-2 text-sm bg-transparent "
            />
        </div>
      </div>

      {/* nav items for mobile */}
      <div className=" flex items-center gap-6">
        {/* Search Icon and functionnality */}
        <div className=" md:hidden h-6 w-6">
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
        </div>

        {/* Profile icon */}
        <Image
          src={profile}
          alt="profile"
          className="rounded-full border-[1px] border-profileGrey"
          width={32}
          height={32}
        />
      </div>
      {/* nav item for mobile end */}
    </nav>
  );
}
