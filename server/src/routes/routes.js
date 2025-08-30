import express from "express";
import { GoogleLogin, loginUser, Register , Logout } from "../controllers/auth.controller.js";
import { getUser } from "../controllers/user.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/register', Register);
router.post('/login', loginUser);
router.post('/google-login', GoogleLogin);
router.post('/logout', verifyJWT, Logout);
router.get('/get-user', verifyJWT, getUser);



export default router;