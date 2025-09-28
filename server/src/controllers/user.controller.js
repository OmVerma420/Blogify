import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from '../utils/cloudinary.js'

export const getUser = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const data = JSON.parse(req.body.data);
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found in Database");
  }

  // update fields
  user.name = data.name || user.name;
  user.bio = data.bio || user.bio;

  // check email uniqueness if changing
  if (data.email && data.email !== user.email) {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      throw new ApiError(400, "Email already in use");
    }
    user.email = data.email;
  }

  // update password only if provided
  if (data.password && data.password.length >= 5) {
    user.password = data.password;
  }

  if (req.file) {
    try {
      const avatar = await uploadOnCloudinary(req.file.buffer);
      if (!avatar || !avatar.url) {
        throw new ApiError(400, "Error while uploading avatar");
      }
      user.avatar = avatar.url;
      
    } catch (error) {
      throw new ApiError(400, "Failed to upload avatar: " + error.message);
    }
  }

  await user.save(); // run pre("save")

  const newUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res.status(200).json(new ApiResponse(200, newUser, "Data updated."));
});

export const getAllUser = asyncHandler(async(req,res) =>{
  const user = await User.find().sort({createdAt:-1})
  return res.status(200).json(new ApiResponse(200, user, "All user are fetched"));
})

export const deleteUser = asyncHandler(async(req,res) =>{
  const {id} = req.params
  const user = await User.findByIdAndDelete(id)
  return res.status(200).json(new ApiResponse(200,  "Data deleted"));
})