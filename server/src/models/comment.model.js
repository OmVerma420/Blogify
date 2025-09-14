import mongoose from "mongoose"

const commentSchema = mongoose.Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Blog'
    },
    comment: {
        type: String,
        required: true,
        trim: true
    }
    

},{timestamps:true})
export const Comment = mongoose.model('Comment', commentSchema);