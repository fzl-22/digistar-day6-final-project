import { HttpError } from "../../core/errors";
import { IOrder } from "../models/order";
import { orderRepository } from "../repositories/order.repository";

export class OrderUsecase {
  static async getOrders(userId: string, isAdmin: boolean): Promise<IOrder[]> {
    return await orderRepository.getOrders(userId, isAdmin);
  }

  static async getOrderById(
    orderId: string,
    customerId: string,
    isAdmin: boolean
  ): Promise<IOrder> {
    const order = await orderRepository.getOrderById(
      orderId,
      customerId,
      isAdmin
    );
    if (!order) {
      throw new HttpError(404, "Order not found.");
    }
    return order;
  }

  static async createOrder(customerId: string): Promise<IOrder | null> {
    return await orderRepository.createOrder(customerId);
  }

  static async updateOrderStatus(
    orderId: string,
    status: "ready" | "paid" | "sent" | "received" | "completed"
  ): Promise<IOrder | null> {
    return await orderRepository.updateOrderStatus(orderId, status);
  }
}
