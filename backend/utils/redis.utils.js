import redisClient from "../config/redis.js";
import logger from "./logger.js";

export async function setRedisData(key, value, expirationInSeconds = 3600) {
  return new Promise((resolve, reject) => {
    redisClient.set(key, value, "EX", expirationInSeconds, (err) => {
      if (err) {
        return reject(err);
      }
      logger.info(`Data set in cache for key: ${key}`);
      resolve();
    });
  });
}

export async function getRedisData(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, data) => {
      if (err) {
        return reject(err);
      }
      logger.info(`Data fetched from cache for key: ${key}`);
      resolve(data);
    });
  });
}
