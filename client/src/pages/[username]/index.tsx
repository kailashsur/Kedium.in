//    src/pages/[username]/index.tsx

import { initializeApollo } from "@/apollo/apolloClient";
import ProfileLayout from "@/components/profile_ui/ProfileLayout";
import { ApolloError, gql } from "@apollo/client";
import { GetServerSidePropsContext } from "next";
/* Import types */
import { Blog } from "@/Types/BlogPost";
import { User } from "@/Types/BlogPost";
import StoryList from "@/components/sections/StoryList.section";

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
        title
        blog_id
        thambnail
        description
        activity {
          total_likes
          total_comments
        }
        author {
          _id
          fullname

          profile {
            profile_img
          }
        }
        draft
        updatedAt
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
}

export default function Profile({ userData, error }: ProfileProps) {
  return (
    <ProfileLayout userData={userData} error={error}>
      <div className="p-4">
        <StoryList blogs={userData?.blogs ?? []} />
      </div>
    </ProfileLayout>
  );
}

// Use getServerSideProps for Server-Side Rendering
export async function getServerSideProps({
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
