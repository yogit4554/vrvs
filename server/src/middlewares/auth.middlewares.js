import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { Admin } from "../models/admin.models.js";


export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = 
            req.cookies?.accessToken || 
            req.header("Authorization")?.replace("Bearer ", "").trim(); // Fix: Remove 'Bearer ' properly

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        // Fix: Check for the proper model if you're using Admins for authentication
        const user = await Admin.findById(decodedToken.id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user; // Attach user to request for future use
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token");
    }
});