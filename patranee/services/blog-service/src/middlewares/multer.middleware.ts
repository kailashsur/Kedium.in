import multer from 'multer';


/**
 * Multer middleware
 * @description Multer middleware for file upload
 * @file multer.middleware.ts
 * @module multer.middleware.ts
 * @version 0.0.1
 * @since 0.0.1
 */

const storare = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename : function (req, file, cb) {
        cb(null, file.originalname);
    }
})

export const upload = multer({
    storage : storare,
    limits : {
        fileSize : 1024 * 1024 * 20     // 20MB
    }
});