import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Comment} from '../models/comment.model.js'


export const addcomment = asyncHandler(async(req , res)=>{
    const { blogId , comment} = req.body
    const newComment = new Comment({
        user: req.user._id,
        blogId:blogId,
        comment:comment
    })
    await newComment.save();

    return res
    .status(200)
    .json(new ApiResponse(200, newComment, "Comment added successfully."));

})

export const getComment = asyncHandler(async(req, res) =>{

    const { blogId } = req.params
    const comment = await Comment.find({blogId}).populate('user','name avatar').sort({createdAt:-1}).lean().exec()

    return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comments fetched successfully."));

})


export const getAllComment = asyncHandler(async(req, res) =>{
    const user = req.user
    
    let comments ;
    if(user.role === 'admin'){
       comments= await Comment.find().populate('blogId','title').populate('user','name').lean().exec()
    } else {
        comments= await Comment.find({user:user._id}).populate('blogId','title').populate('user','name').lean().exec()
    }

    return res
    .status(200)
    .json(new ApiResponse(200, comments, "Comments fetched successfully."));

})

export const deleteComment = asyncHandler(async(req, res) =>{
    const {id} = req.params
    const deletedComment = await Comment.findByIdAndDelete(id)

    if(!deletedComment){
      return res.status(404).json(new ApiResponse(404, null, "Comment not found."));
    }

    return res
    .status(200)
    .json(new ApiResponse(200, "Comment deleted successfully."));

})
