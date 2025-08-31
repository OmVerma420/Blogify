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
    console.log("email" , email);
    console.log("Request Body", req.body);


    if([name , email , password].some((field) => field ?.trim() === "")) {
        throw new ApiError(400 , "All fields are required");
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        throw new ApiError(400 , "Email already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        avatar: avatar || "" 
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
    const {email, password} = req.body;
    

    const existingUser = await User.findOne({email});
    if(!existingUser){
        throw new ApiError(400 , "Invalid email");
    }
    const match = await existingUser.isPasswordCorrect(password);
    if(!match){
        throw new ApiError (400 , "Invalid password");
    }
    
    const user = await User.findById(existingUser._id).select("-password");

    const {refreshToken , accessToken} = await generateAccessAndRefreshToken(user._id);

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set to true in production
        sameSite: process.env.NODE_ENV === "production" ?'none':'strict', 
        path: '/',
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200 ,
            {
                user, accessToken, refreshToken
            }, 
            "User logged In Successfully" 
        )
    )

})

export const Logout = asyncHandler(async (req, res) => {
    if (!req.user || !req.user._id) {
        throw new ApiError(401, "Unauthorized request");
    }

    await User.findByIdAndUpdate(
        req.user._id,
        { $unset: { refreshToken: 1 } },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        path: "/",
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, null, "User logout successfully"));
});


export const GoogleLogin = asyncHandler(async (req, res) => {
  const { email, name, avatar } = req.body;

  if (!email || !name) {
    throw new ApiError(400, "Email and name are required from Google login");
  }

  let user = await User.findOne({ email });

  if (!user) {
    
    user = await User.create({
      name,
      email,
      password: Math.random().toString(36).slice(-8), // generate random password 
      avatar: avatar || null,
      provider: "google"
    });
  }

  // 3. Generate tokens
  const { refreshToken, accessToken } = await generateAccessAndRefreshToken(user._id);

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    path: "/",
  };

  // 4. Return response with tokens
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: await User.findById(user._id).select("-password"), accessToken, refreshToken },
        user.createdAt === user.updatedAt
          ? "User registered and logged in successfully"
          : "User logged in successfully"
      )
    );
});


