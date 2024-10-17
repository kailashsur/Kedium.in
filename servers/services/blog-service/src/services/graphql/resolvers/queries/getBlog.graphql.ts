import { BlogType } from "kedium-types";
import { GetBlogCache, SetBlogCache } from "../../../../config/redis.config";
import Blog from "../../../../models/Blog.model";
import logger from "../../../../utils/logger";



/**
 * 
 * @param _ 
 * @param {_id?: string, slug: string} param1 
 * @returns 
 */

/** Steps
 *      - handle errors wisely
 * 
 *  1. Check if _id or slug is provided
 *  2. Get blog from cache
 *  3. If blog is cached, return it
 *  4. If blog is not cached, get it from database
 *  5. Set the blog in cache asynchronously
 *  6. Return the blog
 */
export default async function GetBlog(_: any, {_id, slug}: {_id?: string, slug: string}){

    try {
        // 1. check if _id or slug is provided
        if(!_id && !slug){
            throw new Error("Either _id or slug is required");
        }

        // 2. get blog from cache
        const cachedBlog = await GetBlogCache(slug);

        // 3. if blog is cached, return it
        if(cachedBlog){
            return JSON.parse(cachedBlog);
        }

        // 4. if blog is not cached, get it from database
        const blog = await Blog.findOne({ $or: [{_id}, {slug}] }) as BlogType;

        if(!blog){
            throw new Error("Blog not found");
        }

        // 5. set the blog in cache asynchronously
        SetBlogCache(blog, 60 * 60 * 24); // 1 day

        // 6. return the blog
        return blog;



    } catch (error : any) {
        logger.error(`Error in GetBlog :: ${error.message}`);
        throw new Error(error.message);
        
    }
}
