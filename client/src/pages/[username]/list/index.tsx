// src/pages/[username]/list/index.tsx

import ProfilePage from "@/components/Profile.page";
import { getProfileServerSideProps } from "@/components/Profile.page";
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
        <div className=" flex justify-center items-center ">No List Found</div>
      </ProfilePage>
    </>
  );
}
export const getServerSideProps = getProfileServerSideProps;
