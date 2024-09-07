import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "../../core/errors";
import { UserUsecase } from "../../domain/usecases/user.usecase";
import { IAuthenticatedRequest } from "../../core/types/interfaces";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await UserUsecase.getUsers();
    res.status(200).json({
      message: "Successfully fetched data!",
      data: {
        users: users.map((user) => {
          return {
            ...user._doc,
            _id: user._id.toString(),
            password: undefined,
          };
        }),
      },
    });
  } catch (err) {
    next(err);
  }
};

type SearchUserQuery = { username?: string; email?: string };
const searchUsers = async (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email } = req.query as SearchUserQuery;

    const users = await UserUsecase.searchUsers(username, email);

    res.status(200).json({
      message: "Successfully fetched users",
      data: {
        users: users.map((user) => {
          return {
            ...user._doc,
            _id: user._id.toString(),
            password: undefined,
          };
        }),
      },
    });
  } catch (err) {
    next(err);
  }
};

type GetUserByIdParams = { userId: string }
const getUserById = async (
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

    const { userId } = req.params as GetUserByIdParams;
    if (!req.isAdmin && userId !== req.user!._id.toString()) {
      const error = new HttpError(403, "Forbidden!");
      throw error;
    }

    const user = await UserUsecase.getUserById(userId);

    res.status(200).json({
      message: "User found!",
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

type UpdateUserParams = {
  userId: string;
};
type UpdateUserBody = {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  address?: string;
};
const updateUser = async (
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

    const { userId } = req.params as UpdateUserParams;
    if (!req.isAdmin && userId !== req.user!._id.toString()) {
      const error = new HttpError(403, "Forbidden!");
      throw error;
    }

    const body = req.body as UpdateUserBody;

    const user = await UserUsecase.updateUser(userId, body);

    res.status(200).json({
      message: "Succesully updated user",
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

type DeleteUserParams = { userId: string };
const deleteUser = async (
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

    const { userId } = req.params as DeleteUserParams;

    await UserUsecase.deleteUser(userId);

    res.status(200).json({
      message: "Successfully deleted user",
    });
  } catch (err) {
    next(err);
  }
};

export default {
  getUsers,
  searchUsers,
  getUserById,
  updateUser,
  deleteUser,
};
