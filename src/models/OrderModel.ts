import { Schema, model, Types } from "mongoose";
const itemSchema = new Schema(
  {
    bookid: {
      type: Types.ObjectId,
      ref: "book",
    },
    quantity: {
      type: Number,
      min: [1, " Quantity cannot be less than 1"],
    },
    priceATpurchase: {
      type: Number,
      min: [1, "Price cannot be less than 1"],
    },
  },
  {
    versionKey: false,
    timestamps: false,
    strict: "throw",
  }
);
const OrderSchema = new Schema(
  {
    id:{type:String,required:true},
    items: [itemSchema],
    user: {
      type: Types.ObjectId,
      ref: "user",
    },
    paymentMethod: {
      type: String,
      required: [true, " Payment method is required"],
    },
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true, versionKey: false, strict: "throw", id: false }
);

export const orderModel = model("order", OrderSchema);
