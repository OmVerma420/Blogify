import express from "express";
import { GoogleLogin, loginUser, Register , Logout } from "../controllers/auth.controller.js";
import { deleteUser, getAllUser, getUser, updateUserProfile } from "../controllers/user.controller.js";

import { onlyAdmin, verifyJWT } from "../middleware/auth.middleware.js";
import {upload} from "../middleware/multer.middleware.js";
import { addCategory, deleteCategory, editCategory, getAllCategory, showCategory } from "../controllers/category.controller.js";
import { addBlog, deleteBlog, editBlog, getAllBlog, getBlog, getBlogByCategory, getRelatedBlog, search, showAllBlog, updateBlog } from "../controllers/blog.controller.js";
import { addcomment, deleteComment, getAllComment, getComment } from "../controllers/comment.controller.js";
import { doLike, getLikeCount } from "../controllers/like.controller.js";  // ✅ add getLikeCount here

const router = express.Router();

router.post('/register', Register);
router.post('/login', loginUser);
router.post('/google-login', GoogleLogin);
router.post('/logout', verifyJWT, Logout);



router.get('/get-user', verifyJWT, getUser);
router.put('/update-profile', verifyJWT,upload.single('avatar'), updateUserProfile);
router.get('/user/get-all-user',verifyJWT,getAllUser)
router.delete('/user/delete-user/:id',verifyJWT,deleteUser)


router.post('/category/add', onlyAdmin, addCategory);
router.put('/category/edit/:categoryId', onlyAdmin, editCategory);
router.get('/category/show/:categoryId', onlyAdmin, showCategory);
router.delete('/category/delete/:categoryId', onlyAdmin, deleteCategory);
router.get('/category/all', getAllCategory);

router.post('/blog/add',verifyJWT,upload.single('file'), addBlog);
router.get('/blog/edit/:blogId',verifyJWT, editBlog);
router.put('/blog/update/:blogId',verifyJWT,upload.single('file'), updateBlog);
router.delete('/blog/delete/:blogId',verifyJWT, deleteBlog);
router.get('/blog/all-blog',verifyJWT, showAllBlog);
router.get('/blogs', getAllBlog);


router.get('/blog/get-blog/:slug', getBlog);
router.get('/blog/get-related-blog/:categorySlug/:currentBlog', getRelatedBlog);
router.get('/blog/get-category-related-blog/:category', getBlogByCategory);
router.get('/search', search);


router.post('/comment/add',verifyJWT, addcomment);
router.get('/comment/get/:blogId', getComment);
router.get('/comment/get-all-comments',verifyJWT,getAllComment);
router.delete('/comment/delete-comment/:id',verifyJWT, deleteComment);



// Like toggle (like/unlike)
router.post("/like/do-like",verifyJWT, doLike);

// Get like count + user status
router.get("/like/get-like-count/:blogId", verifyJWT, getLikeCount);






export default router;