import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { HttpError } from "../../core/errors";
import { AuthUsecase } from "../../domain/usecases/auth.usecase";

type RegisterUserBody = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
};
const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new HttpError(422, "Validation error", errors.array());
      throw error;
    }

    const body = req.body as RegisterUserBody;
    const user = await AuthUsecase.registerUser(body);

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

type LoginUserBody = {
  emailOrUsername: string;
  password: string;
};
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new HttpError(422, "Validation error", errors.array());
      throw error;
    }

    const body = req.body as LoginUserBody;
    const { user, token } = await AuthUsecase.loginUser(body);

    res.status(200).json({
      message: "Successfully signed in!",
      data: {
        user: {
          ...user._doc,
          _id: user._id.toString(),
          password: undefined,
        },
        token: token,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default { registerUser, loginUser };
