import { Response,Request } from "express";
import { bookModel } from "../models/bookModel";
import { BookI } from "../types/BookI";


export const readAllBooks=async(req:Request,res:Response)=>{
    let result:BookI[]=await bookModel.find()
    res.status(200).json({message:"The books are",payload:result})
}
export const createBook=async(req:Request,res:Response)=>{
    let book:BookI=req.body
    let result=await bookModel.insertOne(book)
    res.status(200).json({message:"Inserted Successfully",payload:result})
    
}

export const editBook=async(req:Request,res:Response)=>{
    let updatedBook:BookI=req.body 
    let bookId=req.params['id']
    console.log(updatedBook)
    console.log(bookId)
    let result=await bookModel.findByIdAndUpdate(bookId,{$set:updatedBook},{new:true})
    console.log(result)
    res.status(200).json({message:"The updated successfull",payload:result})
}

export const deleteBook=async(req:Request,res:Response)=>{
    let bookId=req.params['id']
    console.log(bookId)
    let result=await bookModel.findByIdAndDelete({_id:bookId})
    res.status(200).json({message:"book deleted successfully" ,payload:result})
}

export const readOneBook=async(req:Request,res:Response)=>{
    let bookId=req.params['id']
    let book=await bookModel.findOne({_id:bookId})
    console.log(book)
    res.status(200).json({message:"Book",payload:book})
}

export const updateInventory=async(req:Request,res:Response)=>{
    let bookId=req.params['id']
    let quantityToBeAdded=req.body.quantity
    console.log(quantityToBeAdded)
    let result=await bookModel.findByIdAndUpdate({_id:bookId},{$inc:{quantity:quantityToBeAdded}},{new:true})
    console.log(result)
    if(result){
        res.status(200).json({message:"updated"})
    }
    else{
        res.status(401).json({message:"Error occured"})
    }
}