import { Category } from "../models/category.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const addCategory = asyncHandler( async (req , res) => {
    const {name , slug} = req.body
    const category = new Category({
        name , slug
    })

    await category.save()

    res
    .status(200)
    .json(
        new ApiResponse(200, null, "Category added successfully" )
    )
})

export const showCategory = asyncHandler( async (req , res) => {

})
export const editCategory = asyncHandler( async (req , res) => {

})
export const deleteCategory = asyncHandler( async (req , res) => {

})

export const getAllCategory = asyncHandler( async (req , res) => {
    const category = await Category.find().sort({name: 1}).lean().exec()
    res
    .status(200)
    .json(
        new ApiResponse(200 , category ,'Categories fetched successfully' )
    )
})