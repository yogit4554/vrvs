import mongoose,{Schema} from "mongoose";

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Active","Inactive"],
        default:"Active"
    }
},{
    timestamps:true
});



export const User=mongoose.model("User",userSchema)