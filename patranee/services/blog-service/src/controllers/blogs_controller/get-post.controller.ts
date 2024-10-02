import { Request, Response } from "express";




export default function GetPostController(req : Request, res : Response){

    const user = req.user;
    

    return res.status(200).json({message: 'Post fetched successfully', user: user});
}