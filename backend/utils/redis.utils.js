import redisClient from "../config/redis.js";

// All redis caching key parttern
/*
  * Fetch data from Redis

  blogs:* - Fetch all blogs
  blogs:blog:* - Fetch all blog details
  blogs:author:* - Fetch all author details
  blogs:activity:* - Fetch all activity details
  blogs:comment:* - Fetch all comment details

*/

export async function setRedisData(key, value, expirationInSeconds = 3600) {
  return new Promise((resolve, reject) => {
    redisClient.set(key, value, { EX: expirationInSeconds }, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}
