import mongoose from "mongoose"

const blogSchema = mongoose.Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    featuredImage: {
        type: String,
        required: true,
        trim: true,
    },
    blogContent: {
        type: String,
        required: true,
        trim: true,
    }

},{timestamps:true})
export const Blog = mongoose.model('Blog', blogSchema);