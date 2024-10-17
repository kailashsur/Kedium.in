import { GetUserBlogsCache, SetUserBlogsCache } from "../../../../config/redis.config";
import Blog from "../../../../models/Blog.model";
import { BlogType } from "kedium-types";
import logger from "../../../../utils/logger";



/**
 * 
 * @param _ 
 * @param {page : number} param1 
 * @returns 
 * 
 * 
 * steps : 
 *      1. check if page is provided
 *      2. calculate skip and limit
 *      3. get blogs from redis
 */
export default async function GetUserBlogs(_: any, {page=1} : {page : number}, context : any){

    const limit = 10;
    let skip = (page - 1) * limit;

    const user = context.user;
    

    try {
        
        // 3. get blogs from redis
        const CachedBlogs = await GetUserBlogsCache(skip, limit);
        if(CachedBlogs){
            return JSON.parse(CachedBlogs);
        }

        // 4. if blogs are not cached, get them from database
        const Blogs = await Blog.find({ author : user._id }).sort({createdAt: -1}).skip(skip).limit(limit) as unknown as BlogType[];

        // 5. set blogs in redis
        SetUserBlogsCache(Blogs, skip, limit, 60 * 60 * 24);

        return Blogs;
    } catch (error : any) {
        logger.error(`Error in GetUserBlogs :: ${error.message}`);
        throw new Error(error.message);
    }
}