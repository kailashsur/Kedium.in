import { Request, Response } from 'express';
import logger from '../../utils/logger';
import User from '../../models/user.model';

export default async function GetUsers(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    try {
        const users = await User.find()
            .select('_id username fullname verified role profile.profile_img')
            .skip(skip)
            .limit(limit);

        return res.status(200).json(users);
    } catch (error) {
        logger.error('Error in getting users', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}