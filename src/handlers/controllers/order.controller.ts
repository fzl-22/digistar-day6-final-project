import { NextFunction, Response } from "express";
import { IAuthenticatedRequest } from "../../core/types/interfaces";
import { OrderUsecase } from "../../domain/usecases/order.usecase";
import { HttpError } from "../../core/errors";

const getOrders = async (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!._id.toString();
    const isAdmin = req.isAdmin ?? false;

    const orders = await OrderUsecase.getOrders(userId, isAdmin);

    res.status(200).json({
      message: "Orders fetched successfully.",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

type GetOrderByIdParams = { orderId: string };
const getOrderById = async (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId } = req.params as GetOrderByIdParams;

    const customerId = req.user!._id.toString();
    const isAdmin = req.isAdmin ?? false; // Assuming role is available on the user object

    const order = await OrderUsecase.getOrderById(orderId, customerId, isAdmin);
    res.status(200).json({
      message: "Order retrieved successfully.",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

const createOrder = async (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.isAdmin) {
      const error = new HttpError(403, "Forbidden!");
      throw error;
    }

    const customerId = req.user!._id.toString();

    const order = await OrderUsecase.createOrder(customerId);
    if (!order) {
      throw new HttpError(400, "Failed to create order. Cart may be empty.");
    }

    res.status(201).json({
      message: "Order created successfully.",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

type UpdateOrderStatusParams = { orderId: string };
type UpdateOrderStatusBody = {
  status: "ready" | "paid" | "sent" | "received" | "completed";
};
const updateOrderStatus = async (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId } = req.params as UpdateOrderStatusParams;
    const { status } = req.body as UpdateOrderStatusBody;

    const order = await OrderUsecase.updateOrderStatus(orderId, status);
    if (!order) {
      throw new HttpError(404, "Order not found.");
    }

    res.status(200).json({
      message: "Order status updated successfully.",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export default { getOrders, getOrderById, createOrder, updateOrderStatus };
