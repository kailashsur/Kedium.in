import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { GetPostController } from "../controllers";


const post_router = Router();

post_router.route('/get-post').get(verifyJWT, GetPostController)

export default post_router;