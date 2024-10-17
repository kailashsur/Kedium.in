import mongoose from "mongoose";
import Blog from "../models/Blog.model";
import ElasticearchService from "../config/elasticsearch.config";
import { BlogType } from "../Types";
import logger from "../utils/logger";

async function indexExistingBlogs(){

    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        const blogs = await Blog.find({});
        for(const blog of blogs){
            await ElasticearchService.createBlogIndex(blog.toObject() as unknown as BlogType);
        }


        console.log("Blogs indexed successfully");
        process.exit(0);
    } catch (error) {
        logger.error("Error indexing blogs", error);
    }
}

indexExistingBlogs();