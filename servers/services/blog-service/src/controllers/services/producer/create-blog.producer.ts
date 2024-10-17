import { Request, Response } from "express";
import { UserType, BlogType } from 'kedium-types';
import KafkaConfig from "../../../config/kafka.config";
import logger from "../../../utils/logger";
import Blog from "../../../models/Blog.model";
import { kafka_topics } from "../kafka_topics";
import ElasticearchService from "../../../config/elasticsearch.config";

let nanoid: () => string;
import("nanoid").then(module => {
    nanoid = module.nanoid;
});


export default async function CreateBlogProducer(req: Request, res: Response) {

    const user = req.user as UserType;
    const blog = req.blog as BlogType;


    try {

        // Check if the blog alredy exist
        const existing = await Blog.exists({ slug: blog.slug })
        if (existing) {
            return res.status(400).json({
                message: 'Blog already exist',
                data: existing
            });
        }


        // now it is new blog
        if (!blog?.slug) {
            const uniqueid = nanoid();
            blog.slug = `${blog.title.toLowerCase().split(' ').join('-')}-${uniqueid}`;
        }


        if (!blog?.author) {

            blog.author = user._id;
        }

        // Save the new blog to the database
        const newBlog = new Blog(blog);



        const producer = await KafkaConfig.createProducer();
        producer.send({
            topic: kafka_topics.createBlog,
            messages: [
                { value: JSON.stringify(newBlog) },
            ],
        })

        // Create a new index in elasticsearch
        await ElasticearchService.createBlogIndex(newBlog.toObject() as unknown as BlogType);

        return res.status(200).json({
            message: 'Post Created Successfully',
            data: newBlog,
        });

    } catch (error) {
        logger.error("Error in CreatePostController", error);
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }

}
