

import { Request, Response, NextFunction } from 'express';

/**
 * 
 * Error handler
 */

/**
 * Api error handler
 */

// export const apiErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
//     console.error(err.stack);
//     res.status(500).json({ message: 'Server error' });
// }


/**
 * async handler
 */

export const asyncHandler = (requestHandler: any ) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await requestHandler(req, res, next);
        } catch (error) {
            next(error);
        }

    }
}


/**
 * 404 error handler
 */

export const errorHandler = (err:any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
}