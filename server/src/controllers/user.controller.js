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
  console.log("Received file in updateUserProfile:", req.file);
  const data = JSON.parse(req.body.data);
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found in Database");
  }

  // update fields
  user.name = data.name || user.name;
  user.email = data.email || user.email;
  user.bio = data.bio || user.bio;

  // update password only if provided
  if (data.password && data.password.length >= 5) {
    user.password = data.password;
  }

  if (req.file) {
    const avatarLocalPath = req.file.path;
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) {
      throw new ApiError(400, "Error while uploading avatar");
    }
    user.avatar = avatar.url;
    console.log("Uploaded avatar URL:", avatar.url);
  }

  await user.save(); // run pre("save")

  const newUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res.status(200).json(new ApiResponse(200, newUser, "Data updated."));
});
