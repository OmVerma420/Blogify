import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import multer from 'multer';

const url = 'http://localhost:8000';


// Manual GridFS Upload
const memoryStorage = multer.memoryStorage();
const memoryUpload = multer({ 
    storage: memoryStorage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            return cb(new Error('Invalid file type'), false);
        }
        cb(null, true);
    }
});

export const uploadImageManual = async (req, res) => {
    try {
        console.log('=== MANUAL UPLOAD DEBUG ===');
        console.log('File buffer length:', req.file?.buffer?.length);
        console.log('File details:', {
            originalname: req.file?.originalname,
            mimetype: req.file?.mimetype,
            size: req.file?.size
        });

        if (!req.file || !req.file.buffer) {
            return res.status(400).json(
                new ApiError(400, "No file uploaded")
            );
        }

        // Initialize GridFS bucket
        const bucket = new GridFSBucket(mongoose.connection.db, {
            bucketName: 'photos'
        });

        const filename = `${Date.now()}-blog-${req.file.originalname}`;
        
        // Create upload stream
        const uploadStream = bucket.openUploadStream(filename, {
            metadata: {
                originalName: req.file.originalname,
                mimetype: req.file.mimetype,
                uploadDate: new Date()
            }
        });

        // Handle upload completion
        uploadStream.on('finish', (file) => {
            console.log('File uploaded successfully:', file);
            const imageUrl = `${url}/file/${filename}`;
            
            res.status(200).json(
                new ApiResponse(200, imageUrl, "Image successfully stored in Database")
            );
        });

        // Handle upload errors
        uploadStream.on('error', (error) => {
            console.error('Upload stream error:', error);
            res.status(500).json(
                new ApiError(500, "File upload failed")
            );
        });

        // buffer to stream
        uploadStream.write(req.file.buffer);
        uploadStream.end();

    } catch (error) {
        console.error('Manual upload error:', error);
        res.status(500).json(
            new ApiError(500, "Internal server error during file upload")
        );
    }
};


export { memoryUpload };