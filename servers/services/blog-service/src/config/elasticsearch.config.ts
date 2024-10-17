// import { Client } from "@elastic/elasticsearch";
import { Client } from "@opensearch-project/opensearch";
import { BlogType, UserType } from "kedium-types";
import logger from "../utils/logger";
import dotenv from "dotenv";
import aws4 from "aws4";




dotenv.config();

const indexes = {
    blogs: 'blogs',
    users: 'users'
}


const ElasticSearchClient = new Client({
    node: process.env.ELASTICSEARCH_URL || '',
    auth: {
        username: process.env.ELASTICSEARCH_USERNAME || '',
        password: process.env.ELASTICSEARCH_PASSWORD || ''
    },
    ssl: {
        rejectUnauthorized : false
    }
});


class ElasticearchClass {
    private client : Client;

    constructor(){
        this.client = ElasticSearchClient;
    }

    async createBlogIndex(blog : BlogType){
        try {
            const blogData = {
                title: blog.title,
                content: blog.content,
                tags: blog.tags,
                category: blog.category,
                author: blog.author,
                slug: blog.slug,
            }


            await this.client.index({
                index: indexes.blogs,
                body: blogData,
            })
        } catch (error) {
            logger.error("Error creating index", error);
        }
    }

    async searchBlogs(query : string){
        try {
            const result = await this.client.search({
                index: indexes.blogs,
                body: {
                    query: {
                        multi_match: {
                            query,
                            fields: ['title', 'tags', 'category', 'author', 'slug']
                        }
                    },
                    size: 10
                }
            });

            return result.body.hits.hits;
        } catch (error) {
            logger.error("Error searching blogs", error);
            return [];
        }
    }
}

const ElasticearchService = new ElasticearchClass();
export default ElasticearchService;
// async createUserIndex(user : UserType){
//     try {
//         await this.client.index({
//             index: indexes.users,
//             body: {
//                 name: user.name,
//                 email: user.email,
//                 username: user.username,
//                 role: user.role,
//                 profile_picture: user.profile_picture
//             }
//         })
//     } catch (error) {
        
//     }
// }