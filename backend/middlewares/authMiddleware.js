// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import 'dotenv/config';

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.status(401).json({ "error": "No access token" })
    }

    jwt.verify(token, process.env.SECRET_ACCESS_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Access token is invalid" })
        }

        req.user = user.id;

        next()
    })
};

const verifyJWTToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET_ACCESS_KEY, (err, user) => {
            if (err) {
                reject("Access token is invalid");
            }
            resolve(user.id);
        });
    });
};

export default verifyJWT;
export { verifyJWTToken }
