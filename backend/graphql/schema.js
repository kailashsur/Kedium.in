import gql from "graphql-tag";

const types = `
scalar Date

type Blog {
  _id: ID!
  blog_id: String!
  title: String!
  thambnail: String
  description: String
  content: String
  tags: [String]
  author: User!
  activity: Activity
  draft: Boolean
  publishedAt: String!
  updatedAt: String!
}

type Activity {
  total_likes: Int
  total_comments: Int
  total_reads: Int
}

type Profile{
  profile_img : String
  cover_img : String
  bio : String
  profile_color : String
}

type Social_links {
    youtube: String
    instagram: String
    facebook: String
    twitter: String
    github: String
    website: String
  }


type User {
  _id: ID!
  fullname: String!
  email: String!
  username : String
  profile : Profile

  role: String
  verified: Boolean
  interested_in : [String]
  reading_list : [Blog]
  total_posts : Int
  followers_count : Int
  following_count : Int
  followers : [User]
  following : [User]
  social_links : Social_links
  google_auth : Boolean
  pinned_post : [Blog]
  blogs : [Blog]
  joinedAt : String!
  updatedAt : String!
}
`;

const queryType = `
  type Query {
    getBlog(blog_id: String!): Blog
    getBlogs(
    limit : Int
    ip : String
    ): [Blog]
    cacheAll : [Blog]

    getUser(username: String!): User


    getUserBlogs(username: String!): [Blog]
    getUserBlog( blog_id : String!) : Blog
  }
`;

const mutationType = `
  type Mutation {
  createBlog(
    blog_id: String!
    title: String!
    thambnail: String
    description: String
    content: String
    tags: [String]


    draft: Boolean
  ): Blog

  updateBlog(
    blog_id: String!
    title: String
    thambnail: String
    description: String
    content: String
    tags: [String]
    draft: Boolean
  ): Blog

  deleteBlog(blog_id: String!): Blog


  like(blog_id: String!): String!
  total_reads(blog_id: String!): String!
}
`;

const gqlSchema = gql`
  ${types}
  ${queryType}
  ${mutationType}
`;
export default gqlSchema;
