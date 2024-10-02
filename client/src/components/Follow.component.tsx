import React, { useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import { UserState } from "@/store/slices/userSlice.js";
import axios from "axios";
import toast from "react-hot-toast";
import { User } from "@/Types/BlogPost";
import { useDispatch } from "react-redux";
import { enable } from "@/store/slices/authSlice";

export default function FollowButton({
  username,
  me_user,
  target_user,
  className,
  bg_color,
  text_color,
}: {
  username: string | undefined;
  me_user: UserState;
  target_user: User | null;
  className?: string;
  bg_color?: string;
  text_color?: string;
}) {
  const [isDisable, setIsDisable] = React.useState(false);
  const [isFollowing, setIsFollowing] = React.useState(false);
  const [followBack, setFollowBack] = React.useState(false);
  const dispatch = useDispatch();

  const check_following = useCallback(
    (current_user: UserState, target_user: User | null) => {
      return (
        (target_user &&
          current_user?.info?.following?.includes(target_user._id)) ??
        false
      );
    },
    [],
  );

  const check_follow_back = useCallback(
    (target_user: User | null, current_user: UserState) => {
      return (
        target_user?.following?.some(
          (follower_user) => follower_user._id === current_user?.info?._id,
        ) ?? false
      );
    },
    [],
  );

  useEffect(() => {
    setIsFollowing(check_following(me_user, target_user));
    setFollowBack(check_follow_back(target_user, me_user));
  }, [me_user, target_user, check_following, check_follow_back]);

  const handleFollow = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (isDisable) return;

      if (!me_user?.data?.access_token) {
        toast.error("You need to be logged in to follow someone");
        dispatch(enable("login"));
        return;
      }

      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/u/${isFollowing ? "unfollow" : "follow"}?username=${username}`;
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${me_user?.data?.access_token}`,
          },
        });

        toast.success(data.message);
        setIsFollowing(!isFollowing);
        setIsDisable(true);

        setTimeout(() => {
          setIsDisable(false);
        }, 5000);
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "An error occurred");
      }
    },
    [isFollowing, isDisable, me_user, username],
  );

  return (
    <button
      onClick={handleFollow}
      disabled={isDisable}
      className={` ${
        isFollowing
          ? `bg-primary-background border-2 text-primary-text`
          : "bg-primary-dart-background"
      } disabled:bg-primary-dart-background/30 right-0 text-primary-dark-text text-sm py-1 px-2 rounded-full ${className} ${isFollowing ? `bg-primary-background border-2 text-primary-text` : `${bg_color} ${text_color}`}`}
    >
      {isFollowing
        ? "Unfollow"
        : isDisable
          ? "Following"
          : followBack
            ? "Follow Back"
            : "Follow"}
    </button>
  );
}
