import { ObjectId } from "mongodb";
import { IProduct, Product } from "../models/product";

class ProductRepository {
  async findAll(): Promise<IProduct[]> {
    const products = await Product.find();
    return products;
  }

  async findById(productId: string): Promise<IProduct | null>  {
    const product = await Product.findById(productId);
    return product;
  }

  async create(productData: {
    productname: string;
    price: number;
    description: string;
    quantity: number;
    createdBy: string;
  }): Promise<IProduct> {
    const product = new Product({
      ...productData,
      createdBy: new ObjectId(productData.createdBy),
    });
    return await product.save();
  }
}

export const productRepository = new ProductRepository();
