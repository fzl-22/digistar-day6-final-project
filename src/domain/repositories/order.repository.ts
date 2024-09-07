import { ObjectId } from "mongodb";
import { IOrder, Order } from "../models/order";
import { Product } from "../models/product";
import { User } from "../models/user";

class OrderRepository {
  async getOrders(userId: string, isAdmin: boolean): Promise<IOrder[]> {
    if (isAdmin) {
      return Order.find();
    }
    return Order.find({ customerId: ObjectId.createFromHexString(userId) });
  }

  async getOrderById(
    orderId: string,
    customerId: string,
    isAdmin: boolean
  ): Promise<IOrder | null> {
    if (!isAdmin) {
      // Regular user: only get their own order
      const order = await Order.findOne({
        _id: new ObjectId(orderId),
        customerId: new ObjectId(customerId),
      });
      return order;
    } else {
      // Admin: can get any order
      const order = await Order.findById(orderId);
      return order;
    }
  }

  async createOrder(customerId: string): Promise<IOrder | null> {
    const user = await User.findById(customerId);
    if (!user || user.cart.items.length === 0) {
      return null; // Return null if user is not found or cart is empty
    }

    // Get products and their prices
    const productIds = user.cart.items.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    const items = user.cart.items.map((cartItem) => {
      const product = products.find(
        (p) => p._id.toString() === cartItem.productId.toString()
      );
      return {
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        price: product ? product.price : 0,
      };
    });

    // Check if any product's quantity is insufficient
    for (const item of items) {
      const product = products.find(
        (p) => p._id.toString() === item.productId.toString()
      );
      if (!product || product.quantity < item.quantity) {
        return null; // Fail the order creation if any product's quantity is insufficient
      }
    }

    const totalPrice = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Create order
    const order = new Order({
      customerId: ObjectId.createFromHexString(customerId),
      items,
      totalPrice,
      status: "ready",
    });

    await order.save();

    // Reduce product quantities
    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { quantity: -item.quantity },
      });
    }

    // Clear the user's cart after placing the order
    user.cart.items = [];
    user.cart.totalPrice = 0;
    await user.save();

    return order;
  }

  async updateOrderStatus(
    orderId: string,
    status: "ready" | "paid" | "sent" | "received" | "completed"
  ): Promise<IOrder | null> {
    const order = await Order.findById(orderId);
    if (!order) {
      return null;
    }

    order.status = status;
    await order.save();

    return order;
  }
}

export const orderRepository = new OrderRepository();
