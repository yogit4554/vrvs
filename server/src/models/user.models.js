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
        enum: ['Viewer', 'Editor', 'Manager'], // Example roles
        default: 'Viewer',
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