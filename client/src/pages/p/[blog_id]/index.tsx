import AuthLayer from "@/Layout/AuthLayer";
import { UserState } from "@/store/slices/userSlice";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import Loader from "@/components/ui/loader";

const GET_BLOGS = gql`
  query GetUserBlogs($username: String!) {
    getUserBlogs(username: $username) {
      blog_id
      author {
        username
      }
    }
  }
`;

interface Blog {
  blog_id: string;
  author: {
    username: string;
  };
}

export default function Edit() {
  const router = useRouter();
  const userData = useSelector((state: { User: UserState }) => state.User.data);
  const { loading, error, data } = useQuery(GET_BLOGS, {
    variables: { username: userData.username },
  });

  if (userData) {
    if (!loading) {
      const blogs = data.getUserBlogs;

      const res = blogs.some(
        (blog: Blog) => blog.blog_id === router.query.blog_id,
      );

      if (res) {
        router.replace(`/@${userData.username}/${router.query.blog_id}`);
      } else {
        router.replace(`/@${userData.username}`);
      }
    }
  }

  return (
    <AuthLayer>
      <Loader />
    </AuthLayer>
  );
}
