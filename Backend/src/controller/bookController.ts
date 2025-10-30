import { Response,Request } from "express";
import { bookModel } from "../models/bookModel";
import { BookI } from "../types/BookI";

export const readAllBooks=async(req:Request,res:Response)=>{
    let result:BookI[]=await bookModel.find()
    res.status(200).json({message:"The books are",payload:result})
}

export const editBook=async(req:Request,res:Response)=>{
    let updatedBook:BookI=req.body 
    let bookId=req.params['id']
    let result=await bookModel.findByIdAndUpdate({id:bookId},{$set:updatedBook})
    console.log(result)
    res.status(200).json({message:"The updated successfull",payload:result})
}

