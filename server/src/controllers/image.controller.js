import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { User } from "../models/user.model.js";

const BASE_URL = process.env.BASE_URL || 'http://localhost:8000';
const BUCKET = 'test';

async function ensureDbConnected() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connection.asPromise();
  }
}

function sanitize(name = '') {
  return String(name).replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_\-\.]/g, '');
}

export const uploadImage = asyncHandler(async (req, res) => {
  console.log('--- UPLOAD REQ ---');
  console.log('content-type:', req.headers['content-type']);
  console.log('file present:', !!req.file);
  console.log('body:', req.body);
  
  if (!req.file || !req.file.buffer) {
    throw new ApiError(400, 'No file uploaded');
  }

  const username = req.body.username;
  if (!username) {
    throw new ApiError(400, 'username required in body');
  }

  try {
    await ensureDbConnected();
    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: BUCKET });

    const filename = `${Date.now()}-${sanitize(req.file.originalname)}`;

    // Create upload stream
    const uploadStream = bucket.openUploadStream(filename, {
      metadata: {
        originalName: req.file.originalname,
        mimetype: req.file.mimetype,
        uploadedAt: new Date(),
        uploadedBy: username
      }
    });

    // Handle the upload promise properly
    const fileDoc = await new Promise((resolve, reject) => {
      uploadStream.on('finish', () => {
        resolve({
          _id: uploadStream.id,
          filename: filename
        });
      });
      
      uploadStream.on('error', reject);
      
      // Write the buffer to the stream
      uploadStream.end(req.file.buffer);
    });

    const imageUrl = `${BASE_URL}/file/${BUCKET}/${encodeURIComponent(fileDoc.filename)}`;

    // Update user with avatar info
    const user = await User.findOneAndUpdate(
      { username: username.toLowerCase().trim() },
      { 
        avatarFileId: fileDoc._id, 
        avatarFilename: fileDoc.filename, 
        avatarUrl: imageUrl 
      },
      { new: true }
    );

    if (!user) {
      // Cleanup orphan file
      try { 
        await bucket.delete(fileDoc._id); 
      } catch (e) { 
        console.warn('cleanup failed', e); 
      }
      throw new ApiError(404, 'User not found');
    }

    return res.status(200).json(
      new ApiResponse(200, {
        imageUrl,
        filename: fileDoc.filename,
        id: fileDoc._id
      }, 'Image uploaded successfully')
    );

  } catch (error) {
    console.error('Upload error:', error);
    throw new ApiError(500, 'Failed to upload image: ' + error.message);
  }
});

export const getImage = asyncHandler(async (req, res) => {
  const { bucket = BUCKET, filename } = req.params;
  
  if (!filename) {
    return res.status(400).json(new ApiError(400, 'filename required'));
  }

  try {
    await ensureDbConnected();
    const bucketObj = new GridFSBucket(mongoose.connection.db, { bucketName: bucket });

    const downloadStream = bucketObj.openDownloadStreamByName(decodeURIComponent(filename));

    downloadStream.on('file', (file) => {
      const contentType = file.metadata?.mimetype || file.contentType || 'application/octet-stream';
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `inline; filename="${file.filename}"`);
    });

    downloadStream.on('error', (err) => {
      console.error('download error', err);
      if (!res.headersSent) {
        return res.status(404).json(new ApiError(404, 'File not found'));
      }
      return res.end();
    });

    downloadStream.pipe(res);
    
  } catch (error) {
    console.error('Get image error:', error);
    return res.status(500).json(new ApiError(500, 'Failed to retrieve image'));
  }
});