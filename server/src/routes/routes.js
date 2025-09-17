import express from "express";
import { GoogleLogin, loginUser, Register , Logout } from "../controllers/auth.controller.js";
import { getUser, updateUserProfile } from "../controllers/user.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js";
import {upload} from "../middleware/multer.middleware.js";
import { addCategory, deleteCategory, editCategory, getAllCategory, showCategory } from "../controllers/category.controller.js";
import { addBlog, deleteBlog, editBlog, getBlog, getRelatedBlog, showAllBlog, updateBlog } from "../controllers/blog.controller.js";
import { addcomment, getComment } from "../controllers/comment.controller.js";
import { doLike, getLikeCount } from "../controllers/like.controller.js";  // ✅ add getLikeCount here

const router = express.Router();

router.post('/register', Register);
router.post('/login', loginUser);
router.post('/google-login', GoogleLogin);
router.post('/logout', verifyJWT, Logout);

router.get('/get-user', verifyJWT, getUser);
router.put('/update-profile', verifyJWT,upload.single('avatar'), updateUserProfile);

router.post('/category/add', verifyJWT, addCategory);
router.put('/category/edit/:categoryId', verifyJWT, editCategory);
router.get('/category/show/:categoryId', verifyJWT, showCategory);
router.delete('/category/delete/:categoryId', verifyJWT, deleteCategory);
router.get('/category/all', verifyJWT, getAllCategory);

router.post('/blog/add',verifyJWT,upload.single('file'), addBlog);
router.get('/blog/edit/:blogId',verifyJWT, editBlog);
router.put('/blog/update/:blogId',verifyJWT,upload.single('file'), updateBlog);
router.delete('/blog/delete/:blogId',verifyJWT, deleteBlog);
router.get('/blog/all-blog', showAllBlog);
router.get('/blog/get-blog/:slug', getBlog);
router.get('/blog/get-related-blog/:categorySlug', getRelatedBlog);


router.post('/comment/add', addcomment);
router.get('/comment/get/:blogId', getComment);

// Like toggle (like/unlike)
router.post("/like/do-like", doLike);

// Get like count + user status
router.get("/like/get-like-count/:blogId", verifyJWT, getLikeCount);






export default router;