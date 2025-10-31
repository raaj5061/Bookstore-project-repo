import { Schema, model } from "mongoose";

const AddressSchema = new Schema({
  type: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  isDefault: { type: Boolean, default: false }
},{
    strict:"throw",versionKey:false,timestamps:false
});

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  address: [AddressSchema]
});

export const userModel = model("user", UserSchema);
