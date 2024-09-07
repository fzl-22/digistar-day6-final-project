import { NextFunction, Request, Response } from "express";
import { IAuthenticatedRequest } from "../../core/types/interfaces";
import { validationResult } from "express-validator";
import { HttpError } from "../../core/errors";
import { ProductUsecase } from "../../domain/usecases/product.usecase";

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await ProductUsecase.getProducts();

    res.status(200).json({
      message: "Successfully fetched products!",
      data: {
        products: users.map((product) => {
          return {
            ...product._doc,
            _id: product._id.toString(),
          };
        }),
      },
    });
  } catch (err) {
    next(err);
  }
};

type CreateProductBody = {
  productname: string;
  price: number;
  description: string;
  quantity: number;
};
const createProduct = async (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new HttpError(422, "Validation error", errors.array());
      throw error;
    }

    const body = req.body as CreateProductBody;
    const userId = req.user!._id.toString();

    const product = await ProductUsecase.createProduct(body, userId);
    res.status(201).json({
      message: "Product created successfully.",
      data: {
        ...product._doc,
        createdBy: product.createdBy.toString(),
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getProducts,
  createProduct,
};
