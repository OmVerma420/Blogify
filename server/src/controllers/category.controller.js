import { Category } from "../models/category.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const addCategory = asyncHandler( async (req , res) => {
    const {name , slug} = req.body
    const category = new Category({
        name , slug
    })

    await category.save()

    res
    .status(200)
    .json(
        new ApiResponse(200, null, "Category created successfully" )
    )
})

export const showCategory = asyncHandler( async (req , res) => {
    const { categoryId } = req.params;
    if (!categoryId) {
        throw new ApiError(400, "Category ID is required");
    }

    const category = await Category.findById(categoryId);
    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    res.status(200).json(new ApiResponse(200, category, "Category fetched successfully"));
})

export const editCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { name, slug } = req.body;

  if (!categoryId) {
    throw new ApiError(400, "Category ID is required");
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    categoryId,
    { name, slug },
    { new: true }
  );

  if (!updatedCategory) {
    throw new ApiError(404, "Category not found");
  }

  // Use ApiResponse for consistent JSON structure
  return res
    .status(200)
    .json(new ApiResponse(200, updatedCategory, "Category updated successfully"));
});

export const deleteCategory = asyncHandler( async (req , res) => {
    const {categoryId} = req.params;
    if (!categoryId) throw new ApiError(400, "Category ID is required");

    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) throw new ApiError(404,"Category not found");


     return res
    .status(200)
    .json(new ApiResponse(200,null, "Category deleted successfully"));
});

export const getAllCategory = asyncHandler( async (req , res) => {
    const category = await Category.find().sort({name: 1}).lean().exec()
    res
    .status(200)
    .json(
        new ApiResponse(200 , category ,'Categories fetched successfully' )
    )
})
