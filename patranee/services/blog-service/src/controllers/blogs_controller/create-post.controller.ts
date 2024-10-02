import { Request , Response } from "express";
import { BlogType, UserType } from "../../Types";





export default async function CreatePostController ( req: Request , res : Response ) {
    
    const user = req.user as UserType;
    const blog = req.body.blog as BlogType;
    
    

    try {
        


    } catch (error) {
        
    }

}
