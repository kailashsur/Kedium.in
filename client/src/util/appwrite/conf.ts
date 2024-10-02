// import dotenv from 'dotenv';
// dotenv.config();

interface IConf {
    appwriteUrl : string,
    appwriteProjectId : string,
    appwriteDatabaseId : string,
    appwriteCollectionId : string,
    appwriteBucketId : string,
}

const conf : IConf = {
    appwriteUrl : process.env.NEXT_PUBLIC_APPWRITE_URL as string,
    appwriteProjectId : process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string,
    appwriteDatabaseId : process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
    appwriteCollectionId : process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string,
    appwriteBucketId : process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string,
}

export default conf