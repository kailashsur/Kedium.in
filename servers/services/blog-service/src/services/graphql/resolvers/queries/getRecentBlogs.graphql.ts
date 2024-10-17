import  {GetRecentBlogsCache, SetRecentBlogsCache } from "../../../../config/redis.config";
import Blog from "../../../../models/Blog.model";
import logger from "../../../../utils/logger";
// import { BlogType } from "kedium-types";
import { BlogType } from "../../../../Types";


/**
 * 
 * @param _ 
 * @param {page: number} param1 
 * @returns 
 * 
 * 
 * steps : 
 *      1. check if page is provided
 *      2. calculate skip and limit
 *      3. get blogs from redis
 *      4. if blogs are cached, return them
 *      5. if blogs are not cached, get them from database
 *      6. set blogs in redis
 *      7. return blogs
 */
export default async function GetRecentBlogs(_: any, {page=1}: {page: number}){

    const limit = 10;
    let skip = (page - 1) * limit;

    

    try {
        
        // 3. get blogs from redis
        const CachedBlogs = await GetRecentBlogsCache(skip, limit);
        if(CachedBlogs){
            return JSON.parse(CachedBlogs);
        }

        // 4. if blogs are not cached, get them from database
        const Blogs = await Blog.find({}).sort({createdAt: -1}).skip(skip).limit(limit) as unknown as BlogType[];

        // 5. set blogs in redis
        SetRecentBlogsCache(Blogs, skip, limit, 60 * 60 * 24);

        return Blogs;

    } catch (error : any) {
        logger.error(`Error in GetBlogs :: ${error.message}`);
        throw new Error(error.message);
    }

}
