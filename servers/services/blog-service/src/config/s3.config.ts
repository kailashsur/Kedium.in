import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";
import { Readable } from "stream";
import { config } from "dotenv";
config();
import AWS from 'aws-sdk';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import fs from 'fs';





class S3Config {
    private s3Client: AWS.S3;

    private s3_region = process.env.S3_REGION!;
    private s3_accessKeyId = process.env.S3_ACCESS_KEY_ID!;
    private s3_secretAccessKey = process.env.S3_SECRET_ACCESS_KEY!;
    private s3_bucketName = process.env.S3_BUCKET_NAME!;




    constructor() {
        this.s3Client = new AWS.S3({
            region: this.s3_region,
            credentials: {
                accessKeyId: this.s3_accessKeyId,
                secretAccessKey: this.s3_secretAccessKey
            }
        })
    }

    // Upload image to s3
    async uploadImageToS3(fileContent: Express.Multer.File, fileName: string, folder: string): Promise<string> {

        const params = {
            Bucket: this.s3_bucketName,
            Key: fileName,
            folder: folder,
            Body: fileContent,
            ACL: 'public-read',
            ContentType: fileContent.mimetype,
            ContentLength: fileContent.size,

        }

        try {

            const uploadResult = await this.s3Client.upload(params).promise();
            const url = uploadResult.Location;

            fs.unlinkSync(fileContent.path);
            return url;

        } catch (error) {
            console.error("Error uploading image to s3", error);
            throw error;
        }

    }

    getPublicImageUrl(fileName: string) {
        return `https://${this.s3_bucketName}.s3.${this.s3_region}.amazonaws.com/${fileName}`;
    }


    // Get signed url for s3 for temporary access
    async getSignedUrl(fileName: string) {
        const params = {
            Bucket: this.s3_bucketName,
            Key: fileName,
            Expires: 60 * 5 // URL expires in 5 minutes
          };
          return this.s3Client.getSignedUrl('getObject', params);
        //   output like : https://myBucket.s3.amazonaws.com/myKey?AWSAccessKeyId
    }

    async deleteImageFromS3(fileName: string) {
        const params = {
            Bucket: this.s3_bucketName,
            Key: fileName
        }

        try {
            await this.s3Client.deleteObject(params).promise();
            return true;
        } catch (error) {
            console.error("Error deleting image from s3", error);
            throw error;
        }
    }
    // Get image from s3
    async getImageFromS3(fileName: string) {    // fileName example : otpverification.png

    }


}

export const s3Config = new S3Config();



