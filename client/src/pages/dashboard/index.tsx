import {
  library_icon,
  profile_icon,
  stats_icon,
  stories_icon,
} from "@/asets/icons";
import AdminLayout from "@/Layout/AdminLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import React from "react";
import style from "./dashboard.module.css";
import SidebarElement from "@/components/adminUI/sidebarElement";
import { useSelector } from "react-redux";
import { UserState } from "@/store/slices/userSlice";

interface DashboardProps {
  children: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const userData = useSelector((state: { User: UserState }) => state.User.data);
  const router = useRouter();

  const [colaps, setColaps] = React.useState(false);

  return (
    <AdminLayout>
      <div className={`${style.parent} flex flex-col sm:flex-row pt-5 sm:pt-0`}>
        {/* Toggle Button for Mobile */}
        <div
          onClick={() => setColaps(!colaps)}
          className={`sm:hidden p-3 w-fit h-fit bg-primary-dart-background text-primary-dark-text rounded-md`}
        >
          <i
            className={`fi fi-rr-arrow-small-${colaps ? "left" : "right"}`}
          ></i>
        </div>

        {/* Sidebar */}
        <div
          className={`${style.sidebar} ${
            colaps ? style.sidebarOpen : style.sidebarClosed
          } ${colaps ? "" : "w-fit sm:w-1/6"} bg-primary-dart-background text-primary-dark-text  p-4 rounded-md  `}
        >
          <div className="flex flex-col space-y-2">
            <div
              className="mb-5 cursor-pointer"
              onClick={() => setColaps(!colaps)}
            >
              <p className="w-10 h-10 p-2 flex gap-2 items-center justify-center rounded-md pt-3 dark:bg-primary-text">
                <i
                  className={`fi fi-rr-arrow-small-${colaps ? "left" : "right"}`}
                ></i>
              </p>
            </div>

            {/* Sidebar Elements */}
            <SidebarElement
              icon={stats_icon}
              title="Dashboard"
              path="/dashboard"
              colaps={colaps}
              setColaps={setColaps}
            />
            <SidebarElement
              icon={profile_icon}
              title="Profile"
              path={`/@${userData?.username}`}
              colaps={colaps}
              setColaps={setColaps}
            />
            <SidebarElement
              icon={library_icon}
              title="Reading List"
              path="/dashboard/library"
              colaps={colaps}
              setColaps={setColaps}
            />
            <SidebarElement
              icon={stories_icon}
              title="Stories"
              path="/dashboard/stories"
              colaps={colaps}
              setColaps={setColaps}
            />
            <SidebarElement
              icon={<i className="fi fi-rs-settings"></i>}
              title="Settings"
              path="/dashboard/settings"
              colaps={colaps}
              setColaps={setColaps}
            />
            {/* Logout */}
            {/* Add more links as needed */}
          </div>
        </div>

        {/* Content Area */}
        <div
          className={`${
            colaps ? "w-full" : "w-full sm:w-5/6"
          } bg-white p-6 rounded-md `}
        >
          {children}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
