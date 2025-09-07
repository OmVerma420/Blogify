import mongoose from "mongoose"

const categorySchema = mongoose.Schema({
    
    name: {
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
    

})
export const Category = mongoose.model('Category', categorySchema);