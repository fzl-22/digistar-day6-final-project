import mongoose from "mongoose";
import { IDocument } from "../../core/types/interfaces";
import { IUser } from "./user";

interface IProduct extends IDocument<IProduct> {
  _id: mongoose.Schema.Types.ObjectId;
  productname: string;
  price: number;
  description: string;
  quantity: number;
  createdBy: string | IUser;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    productname: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export { IProduct, Product };
