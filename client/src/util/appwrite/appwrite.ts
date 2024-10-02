import conf from "./conf";
import { Client, ID, Databases, Storage } from "appwrite";


export class Service {
    client = new Client();
    bucket;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.bucket = new Storage(this.client);
    }

    // file upload service

    async uploadFile(file : File , imageID : string) {
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
    previewFile(imageID : string) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId, // bucketId
            imageID, // fileId
        );
    }
}


const appwrite_client = new Service()
export default appwrite_client