import exp from "express";
export const orderRoute = exp.Router();
import expressAsyncHandler from "express-async-handler";
import { readAllOrders, createNewOrder, updateOrderStatus } from "../controller/orderController";

//route to create new order
orderRoute.post("/orders", expressAsyncHandler(createNewOrder));

//route to get all orders
orderRoute.get("/orders", expressAsyncHandler(readAllOrders));

//route to update order status
orderRoute.patch("/order/:orderId", expressAsyncHandler(updateOrderStatus));
