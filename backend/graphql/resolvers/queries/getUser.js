import User from "../../../models/User.js";
import redisClient from "../../../config/redis.js";
import { setRedisData } from "../../../utils/redis.utils.js";
import logger from "../../../utils/logger.js"; // Assuming you have a logger utility
import { user_cache_key } from "../../../RedisKeys/redis_keys.js";
import { checkRateLimit } from "../../../rate_limit/rate_limit_method.js";
import {
  PUBLIC_RATE_LIMIT_MAX_REQUESTS,
  PUBLIC_RATE_LIMIT_WINDOW_SECONDS,
} from "../../../rate_limit/rate_limit_config.js";
import { removeAtSymbol } from "../../../lib/methodLib.js";

export default async function getUser(_, { username }, context) {
  if (!username) {
    throw new Error("Username not provided");
  }

  // Remove the '@' symbol if present
  const _username = removeAtSymbol(username);

  const cacheKey = user_cache_key(username);

  // Apply rate limiting per user
  try {
    await checkRateLimit(
      _username,
      PUBLIC_RATE_LIMIT_MAX_REQUESTS,
      PUBLIC_RATE_LIMIT_WINDOW_SECONDS,
    );
  } catch (error) {
    logger.warn(`Rate limit exceeded for user ${_username}: ${error.message}`);
    throw new Error("Too many requests, please try again later.");
  }

  try {
    // Try to fetch user data from Redis cache
    const cachedUser = await redisClient.get(cacheKey);
    if (cachedUser) {
      try {
        const parsedUser = JSON.parse(cachedUser);
        logger.info(`Returning user from cache with username @${_username}`);
        return parsedUser;
      } catch (jsonError) {
        logger.error(
          `Failed to parse cached user data for @${_username}:`,
          jsonError,
        );
      }
    }

    // If user is not in cache, fetch from the database
    const user = await User.findOne({ username: _username });
    if (!user) {
      throw new Error("User not found");
    }

    const userData = JSON.stringify({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      profile: user.profile,
      role: user.role,
      verified: user.verified,
      interested_in: user.interested_in,
      reading_list: user.reading_list,
      total_posts: user.total_posts,
      followers_count: user.followers_count,
      following_count: user.following_count,
      followers: user.followers,
      google_auth: user.google_auth,
      pinned_post: user.pinned_post,
      blogs: user.blogs,
      joinedAt: user.joinedAt,
      updatedAt: user.updatedAt,
      social_links: user.social_links,
      following: user.following,
    });

    // Cache user data asynchronously
    setRedisData(cacheKey, userData, 3600).catch((error) => {
      logger.error(`Error setting data in cache for key ${cacheKey}:`, error);
    });

    return user;
  } catch (error) {
    logger.error(`Error fetching user with username @${_username}:`, error);
    throw new Error("Internal server error");
  }
}
