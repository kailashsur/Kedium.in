import { login } from "./auth/login/login.auth.controller";
import { logout } from "./auth/login/logout.auth.controller";
import { register } from "./auth/register/register.auth.controller";
import { changePassword } from "./auth/change_password.forgot.auth.controller";
import { forgotPassword } from "./auth/forgotPassword.auth.controller";
import { refreshAccessToken } from "./auth/refreshAccessToken.auth.controller";
import { VerifyEmailOTP } from "./auth/VerifyEmailOTP.auth.controller";
import { FollowUser } from "./follow/follow.controller";
import { UnfollowUser } from "./follow/unfollow.controller";
import GetUser from "./user/getUser.controller";
import GetUsers from "./user/getUsers.controller";
import UpdateUser from "./user/updateUser.controller";
import DeleteUser from "./admin/deleteUser.controller";

export {
    login, logout, register, changePassword, forgotPassword, refreshAccessToken, VerifyEmailOTP, FollowUser, UnfollowUser,
    GetUser, GetUsers, UpdateUser, DeleteUser 
}