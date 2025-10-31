import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
  },
  { _id: false, strict: "throw" }
);

const bookSchema = new Schema(
  {
    bookname: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
  },
  { timestamps: true, strict: "throw" }
);

export const bookModel = model("book", bookSchema);
