import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import validator from 'validator'
import userModel from '../models/UserModel.js';

dotenv.config();

const createToken=(id)=>{
    return jwt.sign({id},process.env.SECRET_KEY,{
        expiresIn:'7d'
    })
}

export const register=async(req,res)=>{
    const {name,email,password}=req.body;
    try {
        if(!name || !email || !password){
        return res.status(400).json({success:false,message:"Please enter all the fields!"})
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false,message:"Please enter Valid Email!"})
        }
        if(password.length<6){
            return res.status(400).json({success:false,message:"Password must be more than 6 characters!"})
        }
        const exist=await userModel.findOne({email});
        if(exist){
            return res.status(400).json({success:false,message:"User already exists!"})
        }

        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser=await new userModel({
            name,
            email,
            password:hashedPassword
        })
        await newUser.save()
        const token=createToken(newUser._id);
        return res.json({success:true,token})
            
    } catch (error) {
        return res.status(500).json({success:false,message:"Backend Resgister Error!"})
    }
}



export const login=async(req,res)=>{
    const {email,password}=req.body;

    try {
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(400).json({success:false,message:"Invalid Email!"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            res.status(400).json({success:false,message:"Passwords Not Matched!"})
        }
        const token=createToken(user._id)
        return res.json({success:true,token})

    } catch (error) {
        res.status(400).json({success:false,message:"Backend Login Error!"})
    }
}



export default {register,login}