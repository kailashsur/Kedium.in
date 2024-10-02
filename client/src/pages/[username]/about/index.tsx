// src/pages/[username]/about/index.tsx

import ProfilePage from "@/components/Profile.page";
import { getProfileServerSideProps } from "@/components/Profile.page";
import { fullDate, NumberFormatter } from "@/lib/methods";
import { User } from "@/Types/BlogPost";

interface ProfileProps {
  userData: User | null;
  error: string | null;
}

export default function ListPage({ userData, error }: ProfileProps) {
  if (error) {
    return (
      <div className=" w-full min-h-screen flex justify-center items-center">
        {error}
      </div>
    );
  }
  if (!userData) {
    return (
      <div className=" w-full min-h-screen flex justify-center itenter">
        Loading...
      </div>
    );
  }

  return (
    <>
      <ProfilePage userData={userData} error={error}>
        {/* Bio text html insert  */}

        <p
          dangerouslySetInnerHTML={{ __html: userData?.profile?.bio }}
          className="mt-4"
        />

        {/* member since */}
        <p className="mt-4">Member since {fullDate(userData.joinedAt)}</p>
        <div className=" text-sm text-blue-600 ">
          <span className="mr-3">
            {" "}
            {NumberFormatter(userData?.followers_count)} Followers{" "}
          </span>
          <span> {NumberFormatter(userData?.following_count)} Follwing </span>
        </div>
      </ProfilePage>
    </>
  );
}
export const getServerSideProps = getProfileServerSideProps;
