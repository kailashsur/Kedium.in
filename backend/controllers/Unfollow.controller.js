import User from "../models/User.js";
import redisClient from "../config/redis.js";
import { setRedisData, getRedisData } from "../utils/redis.utils.js";
import { removeAtSymbol } from "../lib/methodLib.js";

export default async function UnfollowController(req, res) {
  const user_id = req.user;

  // Check if the current user is valid
  if (!user_id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  let user;
  try {
    user = await User.findById(user_id);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error while fetching user" });
  }

  if (!user) {
    return res.status(404).json({ message: "Invalid User" });
  }

  const { username } = req.query;
  const _username = removeAtSymbol(username);

  if (!_username) {
    return res.status(400).json({ message: "User not specified to unfollow" });
  }

  let follow_user;
  try {
    follow_user = await User.findOne({ username: _username });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error while fetching user to unfollow" });
  }

  if (!follow_user) {
    return res.status(404).json({ message: "Invalid User to unfollow" });
  }

  if (follow_user._id.equals(user._id)) {
    return res.status(400).json({ message: "Cannot unfollow yourself" });
  }

  // Check if the user is already following the target user
  if (!user.following.includes(follow_user._id)) {
    await Promise.all([
      setRedisData(`users:user:id:${user._id}`, JSON.stringify(user)),
      setRedisData(
        `users:user:username:@${user.username}`,
        JSON.stringify(user),
      ),
    ]);
    return res.status(400).json({ message: "Not following this user" });
  }

  // Remove the follow relationship
  user.following = user.following.filter((id) => !id.equals(follow_user._id));
  follow_user.followers = follow_user.followers.filter(
    (id) => !id.equals(user._id),
  );

  user.following_count = user.following.length;
  follow_user.followers_count = follow_user.followers.length;

  try {
    await Promise.all([
      user.save(),
      follow_user.save(),
      setRedisData(`users:user:id:${user._id}`, JSON.stringify(user)),
      setRedisData(
        `users:user:username:@${user.username}`,
        JSON.stringify(user),
      ),
      setRedisData(
        `users:user:id:${follow_user._id}`,
        JSON.stringify(follow_user),
      ),
      setRedisData(
        `users:user:username:@${follow_user.username}`,
        JSON.stringify(follow_user),
      ),
    ]);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error while updating users" });
  }

  return res
    .status(200)
    .json({ message: `${user.username} has unfollowed ${_username}` });
}
