// OrderContext.tsx
import {createContext, useContext,  useState, useEffect,  type ReactNode,} from "react";
import { cartContextObj } from "./CartContext";
import { userContextObj } from "./UserContext";
import type { AddressType } from "../components/UserRegistration";
// Define the shape of an order
export type OrderItem = {
  id: string;
  items:{
    bookname: string;
    quantity: number;
    price: number;
  }[];
  username: string;
  createdAt: string;
  shippingAddress: AddressType;
  paymentMethod: string;
  paymentDetails: Record<string, any>;
};

// Context type definition
export type OrderContextType = {
  orders: OrderItem[];
  addOrder: (newOrder: OrderItem) => void;
  getOrders: () => void;
  clearCart: () => void;
  closeCart: () => void;
};

// Create context with default values
export const orderContextObj = createContext<OrderContextType>({
  orders: [],
  addOrder: () => {},
  getOrders: () => {},
  clearCart: () => {},
  closeCart: () => {},
});

type ContextProps = {
  children: ReactNode;
};

function OrderContext({ children }: ContextProps) {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const { cart, clearCart, closeCart } = useContext(cartContextObj);
  const { currentUser } = useContext(userContextObj);

  useEffect(() => {
    if (currentUser?.id) {
      getOrders();
    }
  }, [currentUser]);

  function generateOrderId(): string {
    return Math.random().toString(36).substring(2, 12).toUpperCase();
  }

  function addOrder(newOrder: OrderItem) {
    setOrders((prev) => [...prev, newOrder]);
  }

  async function getOrders() {
    try {
      const res = await fetch(
        `http://localhost:3000/orders`
      );
      if (res.status===200) {
        const data: OrderItem[] = await res.json();
        setOrders(data);
        console.log(data)
      } else {
        console.error("Failed to fetch orders. Status:", res.status);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  }

  return (
    <orderContextObj.Provider value={{ orders, addOrder, getOrders, clearCart, closeCart }}>
      {children}
    </orderContextObj.Provider>
  );
}
export default OrderContext;
