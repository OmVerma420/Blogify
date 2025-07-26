import express from "express";
import { signupUser , loginUser} from "../controllers/user.controller.js";
import { memoryUpload } from "../middleware.js/multer.middleware.js";
import { uploadImage } from "../controllers/image.controller.js";

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);

router.post('/file/upload', memoryUpload.single('file'), uploadImage);

export default router;
