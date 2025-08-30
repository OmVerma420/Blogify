import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    bio:{ 
        type: String,
        trim: true
    },
    avatar:{ 
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    refreshToken : {
        type: String,
    },
    

})

userSchema.pre("save" , async function (next){

    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password , 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
     return bcrypt.compare(password , this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email ,
            name: this.name
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model('User', userSchema);