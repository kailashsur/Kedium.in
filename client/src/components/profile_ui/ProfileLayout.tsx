import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { UserState } from "@/store/slices/userSlice";
import Image from "next/image";
import BlueTick from "@/components/ui/BlueTick";
import { useRouter } from "next/router";
import { ApolloError, gql } from "@apollo/client";
import { GetServerSidePropsContext } from "next";
import { initializeApollo } from "@/apollo/apolloClient";
import Username from "@/components/Username";
import ErrorComponent from "../Error.component";
import { Blog } from "@/Types/BlogPost";
import Layout from "@/Layout/Layout";
import Link from "next/link";
import ProfileNavigatorElement from "@/components/profile_ui/profile_navigator_element";
import Fullname from "../Fullname";
import { NumberFormatter } from "@/lib/methods";
import FollowButton from "../Follow.component";
import { User } from "@/Types/BlogPost";

interface Profile {
  cover_img: string;
  profile_img: string;
  bio: string;
  profile_color: string;
}

interface SocialLinks {
  youtube: string;
  instagram: string;
  facebook: string;
  twitter: string;
  github: string;
  website: string;
}

const GET_USER_QUERY = gql`
  query GetUser($username: String!) {
    getUser(username: $username) {
      username
      email
    }
  }
`;
/*
  main component of the profile layout -----------------------------------------------------
*/

const ProfileLayout = ({
  userData,
  error,
  children,
}: {
  userData: User | null;
  error: string | null;
  children: React.ReactNode;
}) => {
  /* ***************** Defination Start ****************** */

  const UserData = useSelector((state: { User: UserState }) => state.User);
  const router = useRouter();

  /* ***************** Defination End ****************** */

  if (error) {
    return (
      <Layout>
        <ErrorComponent message={error} />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className=" flex flex-col h-full pb-10 min-h-screen font-Mori">
        {/* Top cover section */}
        <div className=" relative pb-4 mb-20 ">
          {/* Cover Image */}
          {userData?.profile?.cover_img ? (
            <div className="relative w-full h-52 bg-zinc-50 overflow-hidden rounded-t-md">
              {/* Image */}
              {userData && (
                <Image
                  src={userData?.profile?.cover_img || ""}
                  alt={userData?.fullname || "Profile"}
                  fill={true}
                  objectFit="cover"
                  loading="lazy"
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: "1200/300", objectFit: "cover" }}
                />
              )}

              {/* Bottom blur effect */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary-background to-transparent "></div>
            </div>
          ) : (
            <div className="relative w-full h-32 overflow-hidden"></div>
          )}

          {/* Profile section */}
          <div className=" flex flex-wrap gap-6 items-end justify-between absolute -bottom-12 w-full h-36 py-2 px-4 bg-gradient-to-t from-primary-background to-transparent   ">
            <div className="flex gap-6 items-end">
              {/*Profile Image */}
              <div className=" relative w-16 h-16 rounded-full overflow-hidden shadow-md ">
                <Image
                  src={userData?.profile?.profile_img || ""}
                  alt={userData?.fullname || "Profile"}
                  fill={true}
                  objectFit="cover"
                  loading="lazy"
                />
              </div>
              {userData && (
                //Fullname
                <div className="">
                  <div className="text-2xl text-primary-text capitalize font-bold ">
                    <Fullname
                      fullname={userData?.fullname}
                      verified={userData.verified}
                    />
                  </div>
                  {/*
                  <div className="  flex gap-4 ">
                    <Username
                      username={userData?.username}
                      verified={userData?.verified}
                    />
                  </div>
                  */}
                  <div className=" pt-1 flex gap-2">
                    <i className="fi fi-tr-users inline-block"></i>
                    <span
                      className={`text-sm text-[${UserData?.info?.profile?.profile_color}] `}
                    >
                      {NumberFormatter(userData?.followers_count)}{" "}
                      {" Followers"}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* follow button */}

            {UserData?.data?.username !== userData?.username && (
              <FollowButton
                username={userData?.username}
                me_user={UserData}
                target_user={userData}
              />
            )}
          </div>
        </div>

        {/*Bottom Section Start */}

        <div className=" mt-2">
          {/* navigator slider start */}
          <div className=" border-b border-primary-text/10 h-10 w-full px-4 py-8 flex items-center ">
            <ProfileNavigatorElement
              path={`/@${userData?.username}`}
              title="Home"
            />

            <ProfileNavigatorElement
              path={`/@${userData?.username}/list`}
              title="List"
            />

            <ProfileNavigatorElement
              path={`/@${userData?.username}/about`}
              title="About"
            />
          </div>
          {/* navigator slider End */}
        </div>

        {/* Children Components ************************************************************************** */}
        <div>{children}</div>

        {/*Bottom Section End */}
      </div>
    </Layout>
  );
};

export default ProfileLayout;
