import jwt from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors";
import { JWT_SECRET_KEY } from "../config/env";
import { IAuthenticatedRequest, IDecodedToken } from "../types/interfaces";
import { User } from "../../domain/models/user";
import { IRole } from "../../domain/models/role";

const checkAuthMiddleware = async (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const error = new HttpError(401, "Not authenticated!");
      throw error;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      const error = new HttpError(401, "Not authenticated!");
      throw error;
    }

    const decodedToken = <IDecodedToken>jwt.verify(token, JWT_SECRET_KEY);
    if (!decodedToken) {
      const error = new HttpError(401, "Not authenticated!");
      throw error;
    }

    const userId = decodedToken.userId;
    const authenticatedUser = await User.findById(userId).populate("role");
    if (!authenticatedUser) {
      const error = new HttpError(401, "Not authenticated!");
      throw error;
    }

    const isAdmin = authenticatedUser.role
      ? (authenticatedUser.role as IRole).rolename == "admin"
      : false;

    req.user = authenticatedUser;
    req.isAdmin = isAdmin;
    next();
  } catch (err) {
    next(err);
  }
};

export default checkAuthMiddleware;
