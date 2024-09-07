import mongoose from "mongoose";
import { IRole } from "./role";
import { IDocument } from "../../core/types/interfaces";

interface CartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

interface Cart {
  items: CartItem[];
  totalPrice: number;
}

interface IUser extends IDocument<IUser> {
  _id: mongoose.Schema.Types.ObjectId;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: String | IRole;
  cart: Cart;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: false,
      default: null,
    },
    cart: {
      items: {
        type: [
          {
            productId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product",
              required: true,
            },
            quantity: {
              type: Number,
              required: true,
            },
          },
        ],
        default: [],
      },
      totalPrice: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model<IUser>("User", userSchema);

export { IUser, User };
