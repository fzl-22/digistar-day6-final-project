import { cartRepository } from "../repositories/cart.repository";
import { productRepository } from "../repositories/product.repository";
import { IUser } from "../models/user";
import { HttpError } from "../../core/errors";

export class CartUsecase {
  static async addProductToCart(userId: string, productId: string, quantity: number): Promise<IUser> {
    const product = await productRepository.findById(productId);
    if (!product) {
      throw new HttpError(404, "Product not found.");
    }

    const user = await cartRepository.addProductToCart(userId, productId, quantity);
    if (!user) {
      throw new HttpError(404, "User not found.");
    }

    return user;
  }

  static async getCart(userId: string): Promise<IUser> {
    const user = await cartRepository.getCart(userId);
    if (!user) {
      throw new HttpError(404, "User not found.");
    }

    return user;
  }

  static async clearCart(userId: string): Promise<IUser | null> {
    const user = await cartRepository.clearCart(userId);
    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  }
}

