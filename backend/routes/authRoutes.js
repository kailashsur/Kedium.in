// routes/authRoutes.js
import express from "express";
import hashPassword from "../middlewares/hashPassword.js";
import authControllers from "../controllers/authController.js";

const authRoutes = express.Router();


authRoutes.post("/signup",hashPassword , authControllers.registerUser)
authRoutes.post("/login", authControllers.loginUser)

export default authRoutes;
