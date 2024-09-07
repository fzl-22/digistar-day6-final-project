import { Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { HttpError } from "../../core/errors";
import { CartUsecase } from "../../domain/usecases/cart.usecase";
import { IAuthenticatedRequest } from "../../core/types/interfaces";

type AddProductToCartBody = { productId: string; quantity: number };
const addProductToCart = async (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new HttpError(422, "Validation error", errors.array());
    }

    if (req.isAdmin) {
      const error = new HttpError(403, "Forbidden!");
      throw error;
    }

    const { productId, quantity } = req.body as AddProductToCartBody;
    const userId = req.user!._id.toString();

    const user = await CartUsecase.addProductToCart(
      userId,
      productId,
      quantity
    );

    res.status(200).json({
      message: "Product added to cart successfully.",
      data: {
        cart: user.cart,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getCart = async (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.isAdmin) {
      const error = new HttpError(403, "Forbidden!");
      throw error;
    }

    const userId = req.user!._id.toString();
    const user = await CartUsecase.getCart(userId);

    res.status(200).json({
      message: "Cart retrieved successfully.",
      data: {
        cart: user.cart,
      },
    });
  } catch (error) {
    next(error);
  }
};

const clearCart = async (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.isAdmin) {
      const error = new HttpError(403, "Forbidden!");
      throw error;
    }

    const userId = req.user!._id.toString();
    const user = await CartUsecase.clearCart(userId);

    res.status(200).json({
      message: "Cart cleared successfully.",
      data: user?.cart,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  addProductToCart,
  getCart,
  clearCart,
};
