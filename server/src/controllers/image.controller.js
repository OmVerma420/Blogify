import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"


const url = 'https://localhost:8000'

export const uploadImage = (req, res) => {
    console.log('Request received:', {
        file: req.file,
        body: req.body,
        headers: req.headers
    });
    
    if(!req.file) {
        console.log('No file found in request');
        return res.status(400).json(
            new ApiError(400, "No file uploaded")
        );
    }

    const imageUrl = `${url}/file/${req.file.filename}`;
    
    return res.status(200).json(
        new ApiResponse(200, imageUrl, "Image successfully stored on Database")
    );
}