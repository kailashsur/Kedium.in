import { Request, Response, Router } from "express";
import { upload } from "../middlewares/multer.middleware";
import {  DeleteImageFromCloudinaryController, GetAllImagesOfUserFromCloudinaryController, GetImageUrlFromCloudinaryController, GetTransformedImageUrlFromCloudinaryController, GetUptimizedImageUrlFromCloudinaryController, UploadImageInS3Controller, UploadImageToCloudinaryController } from "../controllers/image_controller/image.controller";
import { verifyJWT } from "../middlewares/auth.middleware";



const service_router = Router();

/**
 * S3 routes
 */
service_router.route('/upload-file-s3').post(verifyJWT, upload.single('image'), UploadImageInS3Controller)


/**
 * Cloudinary routes
 */
service_router.route('/upload-file-cloudinary').post(verifyJWT, upload.single('image'), UploadImageToCloudinaryController)
// take ?s3url query param and return the uptimized image :url
// like :  publicId=folder/abc.jpg
service_router.route('/get-uptimized-image').get(GetUptimizedImageUrlFromCloudinaryController);

// query params: publicId=folder/abc.jpg&transformation=t_thumbnail
service_router.route('/get-transformed-image').get(GetTransformedImageUrlFromCloudinaryController);


// query params: publicId=abc.jpg
service_router.route('/delete-image').delete( verifyJWT ,DeleteImageFromCloudinaryController);
// query params: ?userid=abc&publicId=abc.jpg
service_router.route('/get-image-url').get(GetImageUrlFromCloudinaryController);

service_router.route('/get-all-user-images-').get(verifyJWT, GetAllImagesOfUserFromCloudinaryController);

export default service_router;