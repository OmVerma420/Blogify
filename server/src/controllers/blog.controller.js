import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {encode} from 'entities'
import { Category } from "../models/category.model.js";


export const addBlog = asyncHandler(async (req, res) => {
  const data = JSON.parse(req.body.data);
  if (!data) {
    throw new ApiError(404, "Blog Data not found");
  }

  // Validate category exists
  const categoryExists = await Category.findById(data.category);
  if (!categoryExists) {
    throw new ApiError(404, "Category not found");
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
  const user = req.user
  console.log(user)
  let blog;
  if(user.role === 'admin'){
    blog = await Blog.find().populate('author','name avatar role').populate('category','name slug').sort({ createdAt: -1}).lean().exec()
  } else{
    blog = await Blog.find({author :user._id}).populate('author','name avatar role').populate('category','name slug').sort({ createdAt: -1}).lean().exec()
  }

  return res
    .status(200)
    .json(new ApiResponse(200,blog, "All blogs fetched successfully"));
});


export const getBlog = asyncHandler(async(req, res)=>{
  const {slug} = req.params 
  const blog = await Blog.findOne({slug}).populate('author','name avatar role').populate('category','name slug').lean().exec()

  return res
    .status(200)
    .json(new ApiResponse(200,blog, "All blogs fetched successfully"));

})

export const getRelatedBlog = asyncHandler(async(req, res)=>{
  const {categorySlug , currentBlog} = req.params
  const categoryData = await Category.findOne({slug :categorySlug})
  if(!categoryData){
    return res
      .status(200)
      .json(new ApiResponse(200,[], "No related blogs found"));
  }
  const categoryId = categoryData._id
  const relatedBlog = await Blog.find({category: categoryId , slug:{$ne:currentBlog}}).lean().exec()

  return res
    .status(200)
    .json(new ApiResponse(200,relatedBlog, "All Related blogs are fetched successfully"));

})

export const getBlogByCategory = asyncHandler(async(req, res)=>{
  const {category} = req.params
  const categoryData = await Category.findOne({slug :category})
  if(!categoryData){
    return res
      .status(200)
      .json(new ApiResponse(200,[], "No related blogs found"));
  }
  const categoryId = categoryData._id
  const blog = await Blog.find({category: categoryId }).populate('author','name avatar role').populate('category','name slug').lean().exec()

  return res
    .status(200)
    .json(new ApiResponse(200,{blog, categoryData}, "All Related blogs of same category are fetched successfully"));

})

export const search = asyncHandler(async(req, res)=>{
  const {q} = req.query

  const categoryIds = await Category.find({name: {$regex: q, $options:'i'}}).select('_id').lean().exec();
  const categoryIdList = categoryIds.map(c => c._id);

  const blog = await Blog.find({
    $or: [
      {title: {$regex: q, $options:'i'}},
      {blogContent: {$regex: q, $options:'i'}},
      {category: {$in: categoryIdList}}
    ]
  }).populate('author','name avatar role').populate('category','name slug').lean().exec()

  return res
    .status(200)
    .json(new ApiResponse(200,blog, "Search results fetched successfully"));
})


export const getAllBlog = asyncHandler(async (req, res) => {
  
  const blog = await Blog.find().populate('author','name avatar role').populate('category','name slug').sort({ createdAt: -1}).lean().exec()
  
  
   return res
    .status(200)
    .json(new ApiResponse(200,blog, "Latest 6 blogs fetched successfully"));
});
