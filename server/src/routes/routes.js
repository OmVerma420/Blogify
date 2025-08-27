import express from "express";
import { loginUser, Register } from "../controllers/user.controller.js";
import { memoryUpload } from "../middleware.js/multer.middleware.js"
import { uploadImage, getImage } from "../controllers/image.controller.js";

const router = express.Router();

router.post('/register', Register);
router.post('/login', loginUser);

// Upload route
router.post('/file/upload', memoryUpload.single('file'), uploadImage);

// Get image route - FIXED: Added leading slash and proper parameters
router.get('/file/:bucket/:filename', getImage);

export default router;