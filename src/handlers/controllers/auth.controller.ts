import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { HttpError } from "../../core/errors";
import { AuthUsecase } from "../../domain/usecases/auth.usecase";

type RegisterBody = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new HttpError(422, "Validation error", errors.array());
      throw error;
    }

    const body = req.body as RegisterBody;
    const user = await AuthUsecase.register(body);

    res.status(200).json({
      message: "Successfully added user!",
      data: {
        user: {
          ...user._doc,
          _id: user._id.toString(),
          password: undefined,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

export default  { register }