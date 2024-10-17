import { UserType } from "kedium-types";
import { cloudinaryConfig } from "../../config/cloudinary.config";
import { Request, Response } from "express";
import { s3Config } from "../../config/s3.config";



/**
 * 
 * Cloudinary Controller
 */

export const UploadImageToCloudinaryController = async (req: Request, res: Response) => {
    const user = req.user as UserType;
    const file = req.file;

    if (!file ) {
        return res.status(400).json({
            message: "No file uploaded"
        })
    }

    try {

        const url = await cloudinaryConfig.uploadImageToCloudinary(file, user?._id);
  
        return res.status(201).json({
            message: "Image uploaded in cloudinary successfully",
            url
        });
        
    } catch (error) {
        console.error("Error uploading image", error);
        return res.status(500).json({
            message: "Error uploading image"
        })

    }
}

export const DeleteImageFromCloudinaryController = async (req: Request, res: Response) => {
    const user = req.user as UserType;
    const publicId = req.query.publicId as string;

    try {
        const result = await cloudinaryConfig.deleteImageFromCloudinary(`${user?._id}/${publicId}`);
        return res.status(200).json({
            message: "Image deleted from cloudinary successfully",
            result
        })
    } catch (error) {
        console.error("Error deleting image", error);
        return res.status(500).json({
            message: "Error deleting image"
        })
    }
}
// query params: ?userid=abc
export const GetAllImagesOfUserFromCloudinaryController = async (req: Request, res: Response) => {
    const user = req.user as UserType;

    try {
        const images = await cloudinaryConfig.getAllImagesUrlOfFolder(user?._id.toString());
        return res.status(200).json({
            message: "Images fetched successfully",
            images
        })
    } catch (error) {
        console.error("Error fetching images", error);
        return res.status(500).json({
            message: "Error fetching images"
        })
    }
}

// query params: ?userid=abc&publicId=abc.jpg
export const GetImageUrlFromCloudinaryController = async (req: Request, res: Response) => {
    const userid = req.query.userid as string;
    const publicId = req.query.publicId as string;

    try {
        const url = await cloudinaryConfig.getImageUrl(publicId, userid);
        return res.status(200).json({
            message: "Image url fetched successfully",
            url
        })
    } catch (error) {
        console.error("Error fetching image url", error);
        return res.status(500).json({
            message: "Error fetching image url"
        })
    }
}

export const GetUptimizedImageUrlFromCloudinaryController = async (req: Request, res: Response) => {
    const publicId = req.query.publicId as string;

    try {
        const url = await cloudinaryConfig.getUptimizedImageUrl(publicId);
        return res.status(200).json({
            message: "Uptimized image url fetched successfully",
            url
        })
    } catch (error) {
        console.error("Error fetching uptimized image url", error);
        return res.status(500).json({
            message: "Error fetching uptimized image url"
        })
    }
}

export const GetTransformedImageUrlFromCloudinaryController = async (req: Request, res: Response) => {
    const publicId = req.query.publicId as string;
    const transformation = req.query.transformation as string;

    try {
        const url = await cloudinaryConfig.getTransformedImageUrl(publicId, transformation);
        return res.status(200).json({
            message: "Transformed image url fetched successfully",
            url
        })
    } catch (error) {
        console.error("Error fetching transformed image url", error);
        return res.status(500).json({
            message: "Error fetching transformed image url"
        })
    }
}

/**
 * 
 * S3 Controller
 */
export const UploadImageInS3Controller = async (req: Request, res: Response) => {
    const user = req.user as UserType;
    const file = req.file;
    

    if (!file ) {
        return res.status(400).json({
            message: "No file uploaded"
        })
    }

    try {

        const url = await s3Config.uploadImageToS3(file, `${user._id}-${file.originalname}` , `s3/${user?._id}`);
  
        return res.status(201).json({
            message: "Image uploaded in s3 successfully",
            url
        });
        
    } catch (error) {
        console.error("Error uploading image", error);
        return res.status(500).json({
            message: "Error uploading image"
        })

    }
}

