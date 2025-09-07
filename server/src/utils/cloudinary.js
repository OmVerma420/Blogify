import {v2 as cloudinary} from "cloudinary";
import dotenv from 'dotenv'
import fs from "fs";

dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.error("Cloudinary: No file path received.");
            return null;
        }
        

        //upload the file on cloudinary 
        const response = await cloudinary.uploader.upload(localFilePath , {
            resource_type: "auto",
        })
        // file has been uploaded successfull
        console.log("file is uploaded successfull");

        console.log(response);
        fs.unlinkSync(localFilePath);


        return response;

    } catch (error) {
        console.error("Cloudinary Upload Error:", error);

        fs.unlinkSync(localFilePath);
        return null;
    }
    
    }
export {uploadOnCloudinary}