import multer from 'multer';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

/**
 * Multer middleware
 * @description Multer middleware for file upload
 * @file multer.middleware.ts
 * @module multer.middleware.ts
 * @version 0.0.1
 * @since 0.0.1
 */

const tempFolder = path.join(process.cwd(), 'temp', 'uploads');

if(!fs.existsSync(tempFolder)){
    fs.mkdirSync(tempFolder, {recursive : true});
}


const storare = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, tempFolder);
    },
    filename : function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});


const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
   const allowedFileTypes = /jpeg|jpg|png|gif|webp/;
   const extname = allowedFileTypes.test(path.extname(file.originalname).toLocaleLowerCase());
   const mimetype = allowedFileTypes.test(file.mimetype);

   if(extname && mimetype){
     return cb(null, true);
   }
   else{
    cb(new Error('Error : Images only!'))
   }
}


export const upload = multer({
    storage : storare,
    limits : {
        fileSize : 1024 * 1024 * 10     // 10MB
    },
    fileFilter : fileFilter
});