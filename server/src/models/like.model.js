import mongoose from "mongoose"

const likeSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Blog'
    }

},{timestamps:true})
export const Like = mongoose.model('Like', likeSchema);