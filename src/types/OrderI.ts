import { BookI } from "./BookI";
import { UserI } from "./UserI";

export type OrderStatus = "Pending" | "Shipped" | "Delivered" | "Cancelled";

export interface OrderItemI {
  _id?: string;
  bookid: BookI;
  quantity: number;
  priceATpurchase: number;
}

export interface OrderI {
  _id: string;
  id: string;
  items: OrderItemI[];
  user: UserI;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
