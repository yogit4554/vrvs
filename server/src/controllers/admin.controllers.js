import  {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/apiResponse.js"
import {Admin} from "../models/admin.models.js"
import jwt from "jsonwebtoken"

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
};
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (admin && (await admin.matchPassword(password))) {
            const token = generateToken(admin._id);
            
            // Set token in cookies
            res.cookie("accessToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Only secure in production
                sameSite: "strict",
                maxAge: process.env.ACCESS_TOKEN_EXPIRY_MS,
            });

            res.status(200).json({
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                token,
            });
        } else {
            throw new ApiError(401, "Invalid email or password");
        }
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

const registerAdmin = asyncHandler(async(req,res)=>{
    const { name, email, password } = req.body;
    console.log(req.body);

    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            throw new ApiError(400,"Email already exists!!")
        }

        // Create new admin
        const admin = await Admin.create({ name, email, password });
        
        return res
        .status(201)
        .json(new ApiResponse(200,admin,"new admin created!!"))
    } catch (error) {
        throw new ApiError(400,"Error while registerting the admin!!")
    }
})
export {
    loginAdmin,
    registerAdmin
}