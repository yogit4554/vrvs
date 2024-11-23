import  {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/apiResponse.js"
import {User} from "../models/user.models.js"
import { isValidObjectId } from "mongoose"

const getUsers = asyncHandler(async(req,res)=>{
    try {
        const users = await User.find({});

        return res
        .status(200)
        .json(new ApiResponse(200,users,"Users fetched successfully!!"))
    } catch (error) {
        throw new ApiError(401,error?.message || "Error while getting users")
    }
});

const createUser = asyncHandler(async(req,res)=>{
    const {name,email,role} = req.body;
    console.log(req.body);
    try {
        const user= await User.create({
            name,
            email,
            role
        })

        const CreatedUser= await User.findById(user._id).select(
            "-password"
        )

        if(!CreatedUser){
            throw new ApiError(500, "Something went wrong while registering the user!!!")
        }
    
        return res.status(201).json(
            new ApiResponse(200,CreatedUser,"User Registered Succesfully")
        )

    } catch (error) {
        throw new ApiError(400,error?.message || "Error while creating user!!");
    }
});

const updateUser = asyncHandler(async(req,res)=>{
    const {id}= req.params;
    const {name,email,role,status}= req.body;

    try {
        const user = await User.findByIdAndUpdate(
            id,
            {name,email,role,status},
            {new:true}
        );
        return res
        .status(200)
        .json(new ApiResponse(200,user,"user update Successfully"))
    } catch (error) {
        throw new ApiError(400,error?.message || "Error while updating user!!");
    }
});

const deleteUser = asyncHandler(async(req,res)=>{
    const {id}=req.params;

    if(!isValidObjectId(id)){
        throw new ApiError(400,"user ID is not correct")
    }

    try {
        const user = await User.findById(id);
        if(!user){
            throw new ApiError(400,"user not found")
        }
        await User.findByIdAndDelete(id);
        return res
        .status(200)
        .json(new ApiResponse(200,null,"user deleted Successfully"))
    } catch (error) {
        throw new ApiError(400,error?.message || "Error while deleting user!!");
    }
});



export {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}