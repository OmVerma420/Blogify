
import multer from "multer";

// When a frontend form sends images, it uses multipart/form-data — not JSON.
//Multer is a Node.js middleware for handling multipart/form-data, primarily used for file uploads.
//Express can't read file uploads on its own. You need a helper — and that’s where Multer comes in.

//disk storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,"./public/temp" )
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ storage, })