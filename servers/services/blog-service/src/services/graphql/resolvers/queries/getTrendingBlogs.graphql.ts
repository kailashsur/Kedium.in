import { GetTrendingBlogsCache, SetTrendingBlogsCache } from "../../../../config/redis.config";
import Blog from "../../../../models/Blog.model";
import { BlogType } from "kedium-types";


/**
 * 
 */


export default async function GetTrendingBlogs(_: any, {page=1}: {page: number}){


    const limit = 10;
    let skip = (page - 1) * limit;

    try {
        
        const CachedBlogs = await GetTrendingBlogsCache(skip, limit);
        if(CachedBlogs){
            return JSON.parse(CachedBlogs);
        }

        const Blogs = await Blog.find({}).sort({createdAt: -1}).skip(skip).limit(limit) as unknown as BlogType[];

        SetTrendingBlogsCache(Blogs, skip, limit, 60 * 60 * 24);

        return Blogs;

    } catch (error) {
        
    }
}   