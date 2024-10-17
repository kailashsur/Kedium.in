import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { s3Config } from "./s3.config";
import { ObjectId } from "mongoose";




class CloudinaryConfig {

    private cloudinaryClient = cloudinary;

    private cloudinary_cloud_name = process.env.CLOUDINARY_CLOUD_NAME!;
    private cloudinary_api_key = process.env.CLOUDINARY_API_KEY!;
    private cloudinary_api_secret = process.env.CLOUDINARY_API_SECRET!;


    constructor(){
        this.cloudinaryClient.config({
            cloud_name: this.cloudinary_cloud_name,
            api_key: this.cloudinary_api_key,
            api_secret: this.cloudinary_api_secret,
        });
    }


    /**
     * Upload image from s3 to cloudinary
     * Upload image to direct cloudinary
     */
    async uploadImageFromS3ToCloudinary(s3Url : string){

        const splitArray = s3Url.split("/");
        const user_id = splitArray[splitArray.length - 2];
        const filename = splitArray[splitArray.length - 1];
        
        try {
            
            const image = await this.cloudinaryClient.uploader.upload(
                s3Url,
                {
                    folder: `cloudinary/${user_id}`,
                    public_id: filename,
                    resource_type: "image"
                }

            );
            return image.secure_url;

        } catch (error) {
            throw `Error uploading image from s3 to cloudinary:: at uploadImageFromS3ToCloudinary() ${error}`;
        }
    }

    async uploadImageToCloudinary(file: Express.Multer.File, user_id: ObjectId){
        try {
            const image = await this.cloudinaryClient.uploader.upload(
                file.path,
                {
                    folder: `cloudinary/${user_id}`,
                    public_id: `${user_id}-${file.originalname}`,
                    resource_type: "image"
                }
            );
            fs.unlinkSync(file.path);
            return image.secure_url;
        } catch (error) {
            throw `Error uploading image to cloudinary:: at uploadImageToCloudinary() ${error}`;
        }
    }

    /**
     * Get list of images from cloudinary
     */
    async getAllImagesUrlOfFolder(folder: string){
        try {
            const result = await this.cloudinaryClient.search.expression(`folder:cloudinary/${folder}`).execute();
            return result.resources;
        } catch (error) {
            throw `Error getting all images from cloudinary:: at getAllImagesUrlOfFolder() ${error}`;
        }
    }
    
    async getImageUrl(publicId: string, user_id: ObjectId|string){
        return this.cloudinaryClient.url(`${user_id}/${publicId}`);
    }


    /**
     * 
     * Get transformed image url
     * Get Uptimized image url
     */
    async getTransformedImageUrl(publicId: string, transformation: string){
        return this.cloudinaryClient.url(publicId, {
            transformation
        });
    }
    
    async getUptimizedImageUrl(publicId: string){
        return this.cloudinaryClient.url(publicId, {
            quality: "auto",
            fetch_format: "auto"
        });
    }

    /**
     * 
     * delete image from cloudinary
     */
    async deleteImageFromCloudinary(publicId: string){
        try {
            const result = await this.cloudinaryClient.uploader.destroy(publicId);
            return result;
        } catch (error) {
            throw `Error deleting image from cloudinary:: at deleteImageFromCloudinary() ${error}`;
        }
    }

    
    
}

export const cloudinaryConfig = new CloudinaryConfig();