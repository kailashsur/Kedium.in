
import { verifyJWTToken } from "../../utils/verifyJWTToken";

async function authorized(authorizationHeader : string) {

    if (!authorizationHeader) {
        throw new Error("No access token");
    }

    const token = authorizationHeader;
    if (!token) {
        throw new Error("No access token");
    }

    const user = await verifyJWTToken(token)


    return { user : user };
}

export { authorized }