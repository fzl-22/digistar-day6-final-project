import printPretty from "digistar-hacker-faisal";
import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/index";

const errorHandlingMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status, message, data } = err as HttpError;
  printPretty("error", status, message, data);
  res.status(status || 500).json({
    message: message,
    data: data,
  });
};

export default errorHandlingMiddleware;
