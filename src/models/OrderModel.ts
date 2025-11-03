import { Schema, model, Types } from "mongoose";
const itemSchema = new Schema(
  {
    bookid: {
      type: Types.ObjectId,
      ref: "book",
    },
    quantity: {
      type: Number,
    },
    priceATpurchase: {
      type: Number,
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
    items: [itemSchema],
    user: {
      type: Types.ObjectId,
      ref: "user",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false, strict: "throw" }
);

export const orderModel = model("order", OrderSchema);
