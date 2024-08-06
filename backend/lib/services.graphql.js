
import { verifyJWTToken } from "../middlewares/authMiddleware.js";

async function authorized(authorizationHeader) {

    if (!authorizationHeader) {
        throw new Error("No access token");
    }

    const token = authorizationHeader;
    if (!token) {
        throw new Error("No access token");
    }

    const user = await verifyJWTToken(token);


    return { authorization : true, user : user };
}

export { authorized }