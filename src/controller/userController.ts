import { Request, Response } from "express";
import { userModel } from "../models/userModel";
import {hash,compare} from 'bcryptjs'
import {sign} from 'jsonwebtoken'
import { config } from "dotenv";
import { UserI } from "../types/UserI";


config()
export const createNewUser=async(req:Request , res:Response)=>{
    let user=req.body;
    console.log(user)
    //the password is being hashed to store in db
    let hashedPassword=await hash(user.password,10)
    
    //hashed password has replaced plain password
    user.password=hashedPassword

    let userDoc= new userModel(user)
    let result=await userDoc.save()
    //doc saved 

    console.log(result)
    res.status(201).json({message:"user created Successfully",payload:result})
}
export const login=async(req:Request,res:Response)=>{
    let user=req.body;
    let userObj=await userModel.findOne({username:user.username}).populate({path:"cart._id",model:"book"})
    //console.log(userObj)
    if(userObj){
        let result=await compare(user.password,userObj.password)
        console.log(result)
        if(result){
            let {password,...userData}=userObj.toObject()
            let signedToken=sign({user:userData},process.env['SECRET']!,{expiresIn:'7d'})
            res.cookie(
                "token",signedToken,{httpOnly:true}
            )
            res.status(200).json({message:"Logged in",payload:userData})
        }
    else{
      res.status(401).json({message:"Invalid password"})
    }
  }
  else{
    res.status(401).json({message:"Invalid username"})
  }
}

export const logout=async(req:Request,res:Response)=>{
  console.log("Bye bye")
  res.clearCookie("token",{
    httpOnly:true,
  })
  res.status(200).json({message:"LOGGED OUT"})
}

export const readOneUser=async(req:Request,res:Response)=>{
  const userId=req.params['id']
  let user=await userModel.findOne({_id:userId}).populate({path:"cart._id",model:"book"})
  console.log("One user read",user)
  res.status(200).json({payload:user})
}

export const editUser=async(req:Request,res:Response)=>{
    const userID=req.params['id']
    const user:UserI=req.body
    console.log("the user is ",user)
    let result=await userModel.findByIdAndUpdate({_id:userID},{$set:user})
    console.log(result)
    res.status(200).json({payload:result})
}