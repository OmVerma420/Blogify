import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {encode} from 'entities'

export const addBlog = asyncHandler(async (req, res) => {
  const data = JSON.parse(req.body.data);
  if (!data) {
    throw new ApiError(404, "Blog Data not found");
  }

  let featuredImage = ''

  if (req.file) {
    const featuredImagePath = req.file.buffer;
    const imageURL = await uploadOnCloudinary(featuredImagePath);

    if (!imageURL.url) {
      throw new ApiError(400, "Error while uploading image in blog");
    }
    featuredImage = imageURL.secure_url
  }

  const blog = new Blog({
    author: req.user._id,
    category: data.category,
    title: data.title,
    slug: data.slug,
    featuredImage : featuredImage,
    blogContent: encode(data.blogContent)
  });

  await blog.save()
  return res
    .status(200)
    .json(new ApiResponse(200, "Blog added successfully"));
});

export const editBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
      if (!blogId) {
          throw new ApiError(400, "Blog ID is required");
      }

      const blog = await Blog.findById(blogId).populate('category', 'name _id');
      if (!blog) {
          throw new ApiError(404, "Blog not found");
      }

      res.status(200).json(new ApiResponse(200, blog, "Blog fetched successfully"));
});

export const updateBlog = asyncHandler(async (req, res) => {
  const data = JSON.parse(req.body.data);
  const {blogId} = req.params
  if (!data) {
    throw new ApiError(404, "Blog Data not found");
  }
  const blog = await Blog.findById(blogId)

  blog.category = data.category;
  blog.title = data.title;
  blog.slug = data.slug;
  blog.blogContent = encode(data.blogContent);

  if (req.file) {
    // upload new file
    const featuredImagePath = req.file.buffer;
    const imageURL = await uploadOnCloudinary(featuredImagePath);

    if (!imageURL.url) {
      throw new ApiError(400, "Error while uploading image in blog");
    }
    blog.featuredImage = imageURL.secure_url;
  }
  // else → do nothing, keep the old blog.featuredImage

  await blog.save();


  await blog.save()
  return res
    .status(200)
    .json(new ApiResponse(200, "Blog updated successfully"));
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const {blogId} = req.params;
    if (!blogId) throw new ApiError(400, "Blog ID is required");

    const deletedBlog = await Blog.findByIdAndDelete(blogId);
      if (!deletedBlog) throw new ApiError(404, "Blog not found");


    return res
     .status(200)
     .json(new ApiResponse(200, "Blog deleted successfully"));

});

export const showAllBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.find().populate('author','name avatar role').populate('category','name slug').sort({ createdAt: -1}).lean().exec()

  return res
    .status(200)
    .json(new ApiResponse(200,blog, "All blogs fetched successfully"));
});


export const getBlog = asyncHandler(async(req, res)=>{
  const {slug} = req.params 
  console.log(slug)
  const blog = await Blog.findOne({slug}).populate('author','name avatar role').populate('category','name slug').lean().exec()
  console.log(blog)

  return res
    .status(200)
    .json(new ApiResponse(200,blog, "All blogs fetched successfully"));

})
