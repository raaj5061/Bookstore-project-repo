import { Request, Response } from "express";
import { orderModel } from "../models/OrderModel";

//to create new order
export const createNewOrder = async (req: Request, res: Response) => {
  const order = req.body;
  let orderObj = new orderModel(order);
  let result = await orderObj.save();
  res.status(201).json({ message: "order created", payload: result });
};

//to read all orders
export const readAllOrders = async (req: Request, res: Response) => {
  const orders = await orderModel.find().populate([
    { path: "items.bookid", model: "book" },
    { path: "user", model: "user" },
  ]);
  res.status(200).json({ message: "orders are", payload: orders });
};
//to read one order
export const readOneOrder= async(req:Request,res:Response)=>{
  let userid=req.params['id']
  let result=await orderModel.find({user:userid}).populate([
    { path: "items.bookid", model: "book" },
    { path: "user", model: "user" },
  ])
  res.status(200).json({message:"The order is",payload:result})
}
//to update status for order
export const updateOrderStatus = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const updatedOrder = await orderModel.findByIdAndUpdate(
    orderId,
    { $set: { status: status } },
    { new: true }
  );

  if (!updatedOrder) {
    res.status(404).json({ message: "Order not found" });
  }
  res.status(200).json({ message: "Order status updated", payload: updatedOrder });
};
