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
  bio : String
  profile_color : String
}

type User {
  _id: ID!
  fullname: String!
  email: String!
  username : String
  profile : Profile
}
`;

const queryType = `
  type Query {
    getBlog(blog_id: String!): Blog
    getBlogs(limit : Int): [Blog]
    cacheAll : [Blog]
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
}
`;

const gqlSchema = gql`
  ${types}
  ${queryType}
  ${mutationType}
`;
export default gqlSchema;
