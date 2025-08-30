import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';//middleware
//Cookies are used for authentication, session management, and user preferences


const app = express();
// CORS allows frontend (React, Angular, etc.) to communicate with the backend (Express API).
app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            process.env.CORS_ORIGIN,
            'http://localhost:5174',
            'http://localhost:5173'
        ];
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // Allows browser sending cookies and authentication data in the req.
}))

app.use(express.json())
app.use(express.urlencoded({extended: true , limit: "5mb"}))
app.use(express.static("public"))
app.use(cookieParser()) //This middleware allows you to read cookies sent from the browser via req.cookies.
//it help in Reading the accessToken or refreshToken cookie for authentication

import routes from "./src/routes/routes.js";
import { errorHandler } from "./src/middleware/errorsHandler.middleware.js";

app.use("/api/auth", routes)

app.use(errorHandler);

 
export {app}