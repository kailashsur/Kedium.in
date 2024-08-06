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
};

export default gqlResolver;
