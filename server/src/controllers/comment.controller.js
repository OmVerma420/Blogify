import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {Comment} from '../models/comment.model.js'


export const addcomment = asyncHandler(async(req , res)=>{
    const { author , blogId , comment} = req.body
    const newComment = new Comment({
        author: author,
        blogId:blogId,
        comment:comment
    })
    await newComment.save();

    return res
    .status(200)
    .json(new ApiResponse(200, newComment, "Comment updated."));

})

export const getComment = asyncHandler(async(req, res) =>{

    const { blogId } = req.params
    const comment = await Comment.find({blogId}).populate('author','name avatar').sort({createdAt:-1}).lean().exec()

    return res
    .status(200)
    .json(new ApiResponse(200, comment, "Comments fetched successfully."));

})
