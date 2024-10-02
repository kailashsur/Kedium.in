import Blog from "../models/Blog.js";
import User from "../models/User.js";

import query from "./resolvers/query.js";
import mutation from "./resolvers/mutations.js";

import { GraphQLScalarType, Kind } from "graphql";
import redisClient from "../config/redis.js";
import { activityfunc } from "./resolvers/queries/activity.js";
import { authorfunc } from "./resolvers/queries/author.js";

// Define the Date scalar
const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Custom scalar type for dates",
  serialize(value) {
    return value instanceof Date ? value.toISOString() : null;
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    return ast.kind === Kind.STRING ? new Date(ast.value) : null;
  },
});

const gqlResolver = {
  Date: dateScalar,
  Query: query,
  Mutation: mutation,
  Blog: {
    author: authorfunc,
    activity: activityfunc,
  },
  User: {
    followers: async (parent) => {
      return await User.find({ following: parent._id });
      // return await redisClient.smembers(`users:user:${parent.username}:followers`);
    },
    following: async (parent) => {
      return await User.find({ followers: parent._id });
      // return await redisClient.smembers(`users:user:${parent.username}:following`);
    },
    reading_list: async (parent) => {
      return await Blog.find({ _id: { $in: parent.reading_list } });
    },
    blogs: async (parent) => {
      const blogs = await Blog.find({ author: parent._id });
      return blogs;
    },
  },
};

export default gqlResolver;
