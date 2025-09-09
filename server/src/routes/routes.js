import express from "express";
import { GoogleLogin, loginUser, Register , Logout } from "../controllers/auth.controller.js";
import { getUser, updateUserProfile } from "../controllers/user.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js";
import {upload} from "../middleware/multer.middleware.js";
import { addCategory, deleteCategory, editCategory, getAllCategory, showCategory } from "../controllers/category.controller.js";
import { addBlog, deleteBlog, editBlog, showAllBlog, updateBlog } from "../controllers/blog.controller.js";

const router = express.Router();

router.post('/register', Register);
router.post('/login', loginUser);
router.post('/google-login', GoogleLogin);
router.post('/logout', verifyJWT, Logout);
router.get('/get-user', verifyJWT, getUser);
router.put('/update-profile', verifyJWT,upload.single('avatar'), updateUserProfile);
router.post('/category/add', verifyJWT, addCategory);
router.put('/category/edit', verifyJWT, editCategory);
router.put('/category/show', verifyJWT, showCategory);
router.delete('/category/delete', verifyJWT, deleteCategory);
router.get('/all-category', verifyJWT, getAllCategory);
router.post('/blog/add',verifyJWT,upload.single('file'), addBlog);
router.get('/blog/edit',verifyJWT, editBlog);
router.put('/blog/update',verifyJWT,upload.single('file'), updateBlog);
router.delete('/blog/delete',verifyJWT, deleteBlog);
router.get('/blog/all-blog',verifyJWT, showAllBlog);



export default router;