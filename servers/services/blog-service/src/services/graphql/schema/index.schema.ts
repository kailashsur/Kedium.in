import gql from "graphql-tag";


const types : string = `
type Blog {
    _id : ID!
    slug : String!
    title : String!
    description : String!
    content : String!
    thambnail : String
    tags : [String]
    author : User!
    activity : Activity
    draft : Boolean
    publishedAt : String
    updatedAt : String
}

type Activity {
    post_id : ID!
    slug : String!
    likes : [ID]
    comments : [ID]
}

type User {
    _id : ID!
    username : String!
    email : String!
    role : String
    blogs : [Blog]
    activity : Activity
}

type Social_links {
    youtube: String
    instagram: String
    facebook: String
    twitter: String
    github: String
    website: String
}

`;
const queryType : string = `
type Query {
    GetBlog(_id: String , slug : String!) : Blog
    GetRecentBlogs(page : Int) : [Blog]
    GetTrendingBlogs : [Blog]
    
    GetUserBlogs(username : String!) : [Blog]

}
`;
const mutationType : string = ``;

const gqlSchema = gql`${types} ${queryType} ${mutationType}`;
export default gqlSchema;