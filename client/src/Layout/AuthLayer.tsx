"use client";

// More uptimized version of the authentication layer
import React from "react";
import { SignOut } from "@/lib/auth-methods";
import AuthForm from "@/components/auth/auth";
import { addInfo, addUser, UserState } from "@/store/slices/userSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

// Type imports
import { AuthState } from "@/store/slices/authSlice";

//
const selectAccessToken = createSelector(
  (state: { User: UserState }) => state.User.data,
  (user) => user.access_token,
);

export default function AuthLayer({ children }: { children: React.ReactNode }) {
  const { data } = useSession();
  const access_token = useSelector(selectAccessToken);

  const router = useRouter();
  const dispatch = useDispatch();

  const fetchAccessToken = useCallback(async () => {
    try {
      const response = await axios.get("/api/getcookie");
      if (response.data && response.data.UserAuth) {
        const { access_token } = response.data.UserAuth;
        dispatch(addUser(response.data.UserAuth));
        if (!localStorage.getItem("info")) {
          const userInfo = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/u/getuser`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            },
          );
          dispatch(addInfo(userInfo.data.result));
        }
      } else {
        dispatch(addUser({}));
      }
    } catch (error) {
      dispatch(addUser({}));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!access_token && data?.user) {
      const googleAuth = async () => {
        try {
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/u/auth/google-auth`,
            {
              email: data?.user?.email ?? null,
              fullname: data?.user?.name,
              image: data?.user?.image,
            },
            { withCredentials: true },
          );
        } catch (error) {
          toast.error("Error in Oauth");
        }
      };
      googleAuth();
    }
  }, [access_token, data]);

  useEffect(() => {
    // if (data?.user) {
    // fetchAccessToken();
    // }

    fetchAccessToken();
  }, [data, fetchAccessToken]);

  return <>{children}</>;
}
