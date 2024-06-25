import User from "../model/user.model.js";
import bcryptjs from "bcryptjs"
export const  signup=async (req,res)=>{
    try {
        const {fullname,email,password}=req.body;
        const user=await User.findOne({email})
        if(user){
            return res.status(400).json({message:"Email already exists"})
        }
        const hashPaswword=await bcryptjs.hash(password,10)
        const createdUser=new User({
            fullname:fullname,
            email:email,
            password:hashPaswword,
        })
        await createdUser.save()
        res.status(201).json({message:"User created successfully",user:{
            _id:createdUser._id,
            email:createdUser.email,
            fullname:createdUser.fullname
        }})
    } catch (error) {
        console.log("error"+error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}
export const login=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email})
        const isMatch=await bcryptjs.compare(password,user.password)
        if(!user || !isMatch){
            return res.status(400).json({message:"Invalid"})
        }
        else{
            res.status(200).json({message:"Login successfully",user:{
                _id:user._id,
                fullname:user.fullname,
                email:user.email
            }})
        }
        // const hashPaswword=await bcryptjs.hash(password,10)
        // const createdUser=new User({
        //     email:email,
        //     password:hashPaswword,
        // })
        // await createdUser.save()
        // res.status(201).json({message:"User created successfully"})
    } catch (error) {
        console.log("error"+error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}