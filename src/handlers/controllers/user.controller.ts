import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "../../core/errors";
import { UserUsecase } from "../../domain/usecases/user.usecase";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users = await UserUsecase.getUsers();
  res.status(200).json({
    message: "Successfully fetched data!",
    data: {
      users: users.map((user) => {
        return {
          userId: user.userId,
          username: user.username,
          email: user.email,
          role: user.role,
        };
      }),
    },
  });
};

type SearchUserQuery = { username?: string; email?: string };
const searchUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email } = req.query as SearchUserQuery;

    const users = await UserUsecase.searchUsers(username, email);

    res.status(200).json({
      message: "Successfully fetched users",
      data: {
        users: users.map((user) => {
          return {
            userId: user.userId,
            username: user.username,
            email: user.email,
            role: user.role,
          };
        }),
      },
    });
  } catch (err) {
    next(err);
  }
};

type GetUserByIdParams = { userId: string };
const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new HttpError(422, "Validation error", errors.array());
      throw error;
    }

    const params = req.params as GetUserByIdParams;
    const userId = params.userId;

    const user = await UserUsecase.getUserById(userId);

    res.status(200).json({
      message: "User found!",
      data: {
        user: {
          userId: user.userId,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

type CreateUserBody = { username: string; email: string; password: string };
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new HttpError(422, "Validation error", errors.array());
      throw error;
    }

    const { username, email, password } = req.body as CreateUserBody;
    const user = await UserUsecase.createUser(username, email, password);

    res.status(200).json({
      message: "Successfully added user!",
      data: {
        user: {
          userId: user.userId,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

type EditUserParams = { userId: string };
type EditUserBody = { username?: string; email?: string };
const updateUser =  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new HttpError(422, "Validation error", errors.array());
      throw error;
    }

    const params = req.params as EditUserParams;

    const userId = params.userId;
    const { username, email } = req.body as EditUserBody;

    const user = await UserUsecase.updateUser(userId, {username: username, email: email});

    res.status(200).json({
      message: "Succesully updated user",
      data: {
        user: {
          userId: user.userId,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

type DeleteUserParams = { userId: string }
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
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
  createUser,
  updateUser,
  deleteUser,
};
