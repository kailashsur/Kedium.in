import redisClient from "../config/redis.js";

// Function to check rate limit
export async function checkRateLimit(key, maxRequests, windowSeconds) {
  const currentTime = Math.floor(Date.now() / 1000);
  const windowStart = currentTime - windowSeconds;
  const rateLimitKey = `rate_limit:${key}`;

  // Use a Lua script for atomic increment and expiration setting
  const luaScript = `
    local currentCount = redis.call('INCR', KEYS[1])
    if currentCount == 1 then
      redis.call('EXPIRE', KEYS[1], ARGV[1])
    end
    return currentCount
  `;

  const requestCount = await redisClient.eval(
    luaScript,
    1,
    rateLimitKey,
    windowSeconds,
  );

  if (requestCount > maxRequests) {
    throw new Error(
      `Rate limit exceeded. Try again in ${windowSeconds} seconds.`,
    );
  }
}
