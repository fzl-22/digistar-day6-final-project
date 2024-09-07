import { HttpError } from "../../core/errors";
import { IProduct } from "../models/product";
import { User } from "../models/user";
import { productRepository } from "../repositories/product.repository";

export class ProductUsecase {
  static async getProducts(): Promise<IProduct[]> {
    return await productRepository.findAll();
  }

  static async createProduct(
    productData: {
      productname: string;
      price: number;
      description: string;
      quantity: number;
    },
    userId: string
  ): Promise<IProduct> {
    const user = await User.findById(userId);
    if (!user) {
      throw new HttpError(400, "User not found.");
    }

    const product = await productRepository.create({
      productname: productData.productname,
      price: productData.price,
      description: productData.description,
      quantity: productData.quantity,
      createdBy: user._id.toString(),
    });
    if (!product) {
      throw new HttpError(500, "Failed to create product.");
    }

    return product;
  }
}
