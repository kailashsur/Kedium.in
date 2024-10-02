// src/utils/getProfileProps.ts

import { initializeApollo } from "@/apollo/apolloClient";
import { ApolloError, gql } from "@apollo/client";
import { GetServerSidePropsContext } from "next";
import { User } from "@/Types/BlogPost";

// GraphQL query
const GET_USER_QUERY = gql`
  query GetUser($username: String!) {
    getUser(username: $username) {
      username
      email
      fullname
      profile {
        cover_img
        profile_img
        bio
        profile_color
      }
      verified
      role
      interested_in
      total_posts
      followers_count
      social_links {
        youtube
        instagram
        facebook
        twitter
        github
        website
      }
      google_auth
      joinedAt
      updatedAt
    }
  }
`;

export async function getProfileServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const apolloClient = initializeApollo();
  let error: string | null = null;
  let userData: User | null = null;

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
