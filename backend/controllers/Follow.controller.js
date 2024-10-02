import User from "../models/User.js";
import redisClient from "../config/redis.js";
import { setRedisData, getRedisData } from "../utils/redis.utils.js";
import { removeAtSymbol } from "../lib/methodLib.js";

export default async function FollowController(req, res) {
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
    return res.status(400).json({ message: "User not specified to follow" });
  }

  let follow_user;
  try {
    follow_user = await User.findOne({ username: _username });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error while fetching user to follow" });
  }

  if (!follow_user) {
    return res.status(404).json({ message: "Invalid User to follow" });
  }

  if (follow_user._id.equals(user._id)) {
    return res.status(400).json({ message: "Cannot follow yourself" });
  }

  if (user.following.includes(follow_user._id)) {
    await Promise.all([
      setRedisData(`users:user:id:${user._id}`, JSON.stringify(user)),
      setRedisData(
        `users:user:username:@${user.username}`,
        JSON.stringify(user),
      ),
    ]);
    return res.status(400).json({ message: "Already following" });
  }

  user.following.push(follow_user._id);
  follow_user.followers.push(user._id);

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
    .json({ message: `${user.username} is now following ${_username}` });
}

// import User from "../models/User.js";
// import redisClient from "../config/redis.js";
// import { setRedisData, getRedisData } from "../utils/redis.utils.js";
// import { removeAtSymbol } from "../lib/methodLib.js";

// export default async function FollowController(req, res) {
//   const user_id = req.user;

//   // checking the current user is valid or not
//   if (!user_id) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const user = await User.findById(user_id);

//   if (!user) {
//     return res.status(404).json({ message: "Invalid User" });
//   }

//   //  checking the user to follow is valid or not
//   const { username } = req.query;
//   const _username = removeAtSymbol(username);

//   if (!_username) {
//     return res.status(400).json({ message: "User not given to follow" });
//   }

//   const follow_user = await User.findOne({ username: _username });

//   if (!follow_user) {
//     return res.status(404).json({ message: "Invalid User to follow" });
//   }

//   // Ensure the user is not trying to follow themselves
//   if (follow_user._id.equals(user._id)) {
//     return res.status(400).json({ message: "Cannot follow yourself" });
//   }

//   // Check if the user is already following to the target user
//   if (user.following.includes(follow_user._id)) {
//     setRedisData(`users:user:id:${user._id}`, JSON.stringify(user));
//     setRedisData(`users:user:username:@${user.username}`, JSON.stringify(user));

//     return res.status(400).json({ message: "Already following" });
//   }

//   // its time to follow the user
//   user.following.push(follow_user._id);
//   follow_user.followers.push(user._id);

//   // Update the following and followers count
//   user.following_count = user.following.length;
//   follow_user.followers_count = follow_user.followers.length;

//   await user.save();
//   await follow_user.save();

//   // Update the redis cache
//   // Update the following count of the current user
//   await setRedisData(`users:user:id:${user._id}`, JSON.stringify(user));
//   await setRedisData(
//     `users:user:username:@${user.username}`,
//     JSON.stringify(user),
//   );

//   // Update the followers count of the target user
//   await setRedisData(
//     `users:user:id:${follow_user._id}`,
//     JSON.stringify(follow_user),
//   );
//   await setRedisData(
//     `users:user:username:@${follow_user.username}`,
//     JSON.stringify(follow_user),
//   );

//   return res
//     .status(200)
//     .json({ message: `${user.username} You followed to ${_username} ` });
// }
