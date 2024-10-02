// src/components/ProfilePage.tsx
import React from "react";
import { initializeApollo } from "@/apollo/apolloClient";
import ProfileLayout from "@/components/profile_ui/ProfileLayout";
import { ApolloError, gql } from "@apollo/client";
import { GetServerSidePropsContext } from "next";
import { User } from "@/Types/BlogPost";

// GraphQL query
const GET_USER_QUERY = gql`
  query GetUser($username: String!) {
    getUser(username: $username) {
      _id
      fullname
      email
      username
      profile {
        profile_img
        cover_img
        bio
        profile_color
      }
      role
      verified
      interested_in
      total_posts
      followers_count
      following_count
      followers {
        _id
      }
      following {
        _id
      }
      social_links {
        youtube
        instagram
        facebook
        twitter
        github
        website
      }
      google_auth

      blogs {
        _id
      }
      joinedAt
      updatedAt
      pinned_post {
        _id
      }
    }
  }
`;

interface ProfileProps {
  userData: User | null;
  error: string | null;
  children: React.ReactNode;
}

export default function ProfilePage({
  userData,
  error,
  children,
}: ProfileProps) {
  return (
    <ProfileLayout userData={userData} error={error}>
      <div className=" p-4">{children}</div>
    </ProfileLayout>
  );
}

// Reusable getServerSideProps
export async function getProfileServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const apolloClient = initializeApollo();
  let error: string | null = null;
  let userData: User | null = null;
  console.log("Params username:", params?.username);

  try {
    const { data } = await apolloClient.query({
      query: GET_USER_QUERY,
      variables: {
        username: params?.username,
      },
    });

    userData = data?.getUser;

    if (!userData) {
      error = "User not found";
    }
  } catch (err) {
    if (err instanceof ApolloError) {
      error = err.message;
      console.error("Apollo Error:", err);
    } else {
      error = "An unexpected error occurred";
      console.error("Unexpected Error:", err);
    }
  }

  return {
    props: {
      userData,
      error,
    },
  };
}
