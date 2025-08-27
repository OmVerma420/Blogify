import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave : false});

        return {refreshToken , accessToken}

    } catch(error) {
        throw new ApiError(500 , "Somthing went wrong while generating refresh and access tokens")
    }
}


export const Register = asyncHandler( async(req , res) => {
    const {name , email , password} = req.body;
    console.log("username" , username);
    console.log("Request Body", req.body);


    if([name , email , password].some((field) => field ?.trim() === "")) {
        throw new ApiError(400 , "All fields are required");
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new ApiError(400 , "Username already exists");
    }

    const user = await User.create({
        name,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering use");
    }

    return res.status(201).json(
        new ApiResponse(201 , createdUser , "User registered  successfully")
    )

})


export const loginUser = asyncHandler(async(req , res) => {
    const {username, password} = req.body;
    console.log("Request Body", req.body);

    const existingUser = await User.findOne({username});
    if(!existingUser){
        throw new ApiError(400 , "Invalid username");
    }
    const match = await existingUser.isPasswordCorrect(password);
    if(!match){
        throw new ApiError (400 , "Invalid password");
    }
    
    const user = await User.findById(existingUser._id).select("-password");

    const {refreshToken , accessToken} = await generateAccessAndRefreshToken(user._id);

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200 ,
            {
                user : user, accessToken, refreshToken
            }, 
            "User logged In Successfully" 
        )
    )

})

