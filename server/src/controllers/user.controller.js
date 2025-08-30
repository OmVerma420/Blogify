import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getUser = asyncHandler(async(req , res)=> {
    const user = req.user;
    if(!user){
        throw new ApiError(404 , "User not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(
            200 , user , "User fetched successfully"
        )
    )
})