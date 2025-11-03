import { Request,Response } from "express";
import { orderModel } from "../models/OrderModel";

export const createNewOrder=async(req:Request,res:Response)=>{
    const order=req.body
    let orderObj=new orderModel(order)
    let result=await orderObj.save()
    res.status(201).json({message:"order created",payload:result})
}

export const readAllOrders=async(req:Request,res:Response)=>{
    const orders=await orderModel.find().populate([{path:"items.bookid",model:"book"},{path:"user",model:"user"}])
    res.status(200).json({message:"orders are",payload:orders})
}