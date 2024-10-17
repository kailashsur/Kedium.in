
import { asyncHandler } from "./errorHandlers";
import jwt from 'jsonwebtoken';
import 'dotenv/config';


const verifyJWTToken = async (token : string) => {
    return new Promise((resolve, reject)=>{
        jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET as string, (err, decoded)=>{
            if(err){
                reject('Invalid Access Token');
            }
            resolve(decoded);
        })
    })
};

export { verifyJWTToken };