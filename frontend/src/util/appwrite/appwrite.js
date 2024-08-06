import conf from "./conf.js";
import { Client, ID, Databases, Storage } from "appwrite";

export class Service {
    client = new Client();
    bucket;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.bucket = new Storage(this.client);
    }

    // file upload service

    async uploadFile(file, imageID) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                imageID? imageID : ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }
    previewFile(imageID) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId, // bucketId
            imageID, // fileId
        );
    }
}


const appwrite_client = new Service()
export default appwrite_client