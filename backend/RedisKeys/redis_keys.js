// // Base Key of redis
// export const baseCacheKey = `blogs:activity:${blog.blog_id}`;

// // Activity Key of redis
// export const activityKey = `blogs:activity:${blog.blog_id}`;

//     redisClient.get(`${baseCacheKey}:total_likes`),
//     redisClient.get(`${baseCacheKey}:total_comments`),
//     redisClient.get(`${baseCacheKey}:total_reads`),

export function user_cache_key(username) {
  return `users:user:username:${username}`;
}
export function user_cache_key_username(user_id) {
  return `users:user:id:${user_id}`;
}
