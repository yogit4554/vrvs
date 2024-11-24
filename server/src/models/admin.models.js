import mongoose,{Schema} from "mongoose";
import bcrypt from "bcryptjs"

const adminSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

adminSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password= await bcrypt.hash(this.password,10)
    next()
})

adminSchema.methods.matchPassword =async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

export const Admin=mongoose.model("Admin",adminSchema)