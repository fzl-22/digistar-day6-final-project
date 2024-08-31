import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "../../core/errors";
import { UserUsecase } from "../../domain/usecases/user.usecase";

const getUsers = (req: Request, res: Response, next: NextFunction) => {
  const users = UserUsecase.getUsers();
  res.status(200).json({
    message: "Successfully fetched data!",
    data: {
      users: users.map((user) => user.toJSON()),
    },
  });
};

type SearchUserQuery = { name?: string; email?: string };
const searchUsers = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.query as SearchUserQuery;

    const users = UserUsecase.searchUsers(name, email);

    res.status(200).json({
      message: "Successfully fetched users",
      data: {
        users: users.map((user) => user.toJSON()),
      },
    });
  } catch (err) {
    next(err);
  }
};

type GetUserByIdParams = { userId: string };
const getUserById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new HttpError(422, "Validation error", errors.array());
      throw error;
    }

    const params = req.params as GetUserByIdParams;
    const userId = params.userId;

    const user = UserUsecase.getUserById(userId);

    res.status(200).json({
      message: "User found!",
      data: {
        user: user.toJSON(),
      },
    });
  } catch (err) {
    next(err);
  }
};

type CreateUserBody = { name: string; email: string; password: string };
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new HttpError(422, "Validation error", errors.array());
      throw error;
    }

    const { name, email, password } = req.body as CreateUserBody;
    const user = await UserUsecase.createUser(name, email, password);

    res.status(200).json({
      message: "Successfully added user!",
      data: {
        user: user.toJSON(),
      },
    });
  } catch (err) {
    next(err);
  }
};

type EditUserParams = { userId: string };
type EditUserBody = { name?: string; email?: string };
const updateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new HttpError(422, "Validation error", errors.array());
      throw error;
    }

    const params = req.params as EditUserParams;

    const userId = params.userId;
    const { name, email } = req.body as EditUserBody;

    const user = UserUsecase.updateUser(userId, name, email);

    res.status(200).json({
      message: "Succesully updated user",
      data: {
        user: user.toJSON(),
      },
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new HttpError(422, "Validation error", errors.array());
      throw error;
    }

    const userId = req.params.userId;

    UserUsecase.deleteUser(userId);

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
  createUser,
  updateUser,
  deleteUser,
};
