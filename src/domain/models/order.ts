import mongoose from "mongoose";


interface IOrderItem {
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
  price: number; // Store price at the time of order to avoid discrepancies
}

interface IOrder extends mongoose.Document {
  customerId: mongoose.Schema.Types.ObjectId;
  items: IOrderItem[];
  totalPrice: number;
  status: "ready" | "paid" | "sent" | "received" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
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
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["ready", "paid", "sent", "received", "completed"],
      default: "ready",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);

export { IOrder, Order };
