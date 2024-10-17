import { Request, Response } from "express";
import ElasticearchService from "../../config/elasticsearch.config";
import logger from "../../utils/logger";

const searchBlogs = async (req: Request, res: Response) => {
    try {
        const { q } = req.query;
        
        if(!q || typeof q !== 'string'){
            return res.status(400).json({
                message: "Invalid search query"
            });
        }

        const blogs = await ElasticearchService.searchBlogs(q as string);
        return res.status(200).json({
            message: "Blogs fetched successfully",
            data: blogs 
        });



    } catch (error) {
        logger.error("Error searching blogs", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export default {
    searchBlogs
}