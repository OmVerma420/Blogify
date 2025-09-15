import { Like } from "../models/like.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"



export const doLike = asyncHandler(async(req, res)=>{
    const {user , blogId} = req.body
    let like
    like = await Like.findOne({user , blogId})
    if(!like){
        const storeLike = new Like({
            user , blogId
        })
        like = await storeLike.save()
    }else{
        await Like.findByIdAndDelete(like._id)
    }

    const totalLike = await Like.countDocuments({blogId})
    return res
    .status(200)
    .json(new ApiResponse(200,totalLike, "Like action processed successfully"));
})


export const getLikeCount = asyncHandler(async(req, res)=>{
    const {blogId} = req.params
    const likeCount = await Like.countDocuments({blogId})

    return res
    .status(200)
    .json(new ApiResponse(200, likeCount, "All Likes are fetched successfully"));
})
