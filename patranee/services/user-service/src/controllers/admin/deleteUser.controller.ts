import { Request, Response } from "express";
import { UserType } from "../../Types";
import logger from "../../utils/logger";
import User from "../../models/user.model";


export default async function DeleteUser (req: Request, res: Response){

    const targate_username = req.params.username;
    const _user = req.user as UserType;

    
    if(_user.role !== 'admin'){
        return res.status(403).json({ message: 'Forbidden' });
    }
    
    // Check if the user should be given any details except username
    if (!targate_username) {
        return res.status(422).json({ message: 'Unprocessable Entity' });
    }
    
    if (_user.username !== targate_username) {
        return res.status(403).json({ message: 'Forbidden' });
    }

    // Delete the user

    try {
        
        const isValidUser = await User.findOne({ username: targate_username });

        if(!isValidUser){
            return res.status(404).json({ message: 'User not found' });
        }

        await User.deleteOne({ username: targate_username });

        return res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        logger.error("Error at DeleteUser() :: ",error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

}