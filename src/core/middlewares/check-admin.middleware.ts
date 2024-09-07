import { NextFunction, Response } from "express";
import { IAuthenticatedRequest } from "../types/interfaces";
import { HttpError } from "../errors/index";

const checkAdminMiddleware = (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.isAdmin) {
      const error = new HttpError(403, "Forbidden!");
      throw error;
    }
    next();
  } catch (err) {
    next(err);
  }
}

export default checkAdminMiddleware;

