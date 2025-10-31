import { BookI } from "./BookI";

export type UserI={
    id?:string;
    username:string,
    email:string,
    password:string,
    confirmPassword:string;
    role:string,
    address:AddressType[],
    cart:CartItem[]
}
export type AddressType = {
  id: string;
  type: "Home" | "Work" | "Other";
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
};
 export type CartItem = BookI & {
  quantity: number;
};
