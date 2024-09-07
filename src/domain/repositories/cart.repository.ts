import { ObjectId } from "bson";
import { User, IUser } from "../models/user";
import { Product } from "../models/product";

class CartRepository {
  async addProductToCart(
    userId: string,
    productId: string,
    quantity: number
  ): Promise<IUser | null> {
    const user = await User.findById(userId);
    if (!user) {
      return null;
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found.");
    }

    const cartItemIndex = user.cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (cartItemIndex >= 0) {
      // Update the quantity if the product is already in the cart
      user.cart.items[cartItemIndex].quantity += quantity;
    } else {
      // Add new product to the cart
      user.cart.items.push({
        productId: ObjectId.createFromHexString(productId),
        quantity,
      });
    }

    // Recalculate total price
    const totalPrice = await this.calculateTotalPrice(user.cart.items);

    user.cart.totalPrice = totalPrice;

    await user.save();
    return user;
  }

  async getCart(userId: string): Promise<IUser | null> {
    const user = await User.findById(userId).populate("cart.items.productId");
    return user;
  }

  async clearCart(userId: string): Promise<IUser | null> {
    const user = await User.findById(userId);
    if (!user) {
      return null;
    }

    user.cart.items = [];
    user.cart.totalPrice = 0;

    await user.save();
    return user;
  }

  private async calculateTotalPrice(
    cartItems: { productId: ObjectId; quantity: number }[]
  ): Promise<number> {
    const productIds = cartItems.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } }).exec();

    const productMap = new Map(
      products.map((product) => [product._id.toString(), product.price])
    );

    return cartItems.reduce((total, item) => {
      const price = productMap.get(item.productId.toString()) || 0;
      return total + price * item.quantity;
    }, 0);
  }
}

export const cartRepository = new CartRepository();
