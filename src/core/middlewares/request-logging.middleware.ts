import printPretty from "digistar-hacker-faisal";
import { NextFunction, Request, Response } from "express";

const requestLoggingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method, url, body } = req;
  printPretty("info", `REQ: ${method} ${url}`, `BODY: ${JSON.stringify(body) }`);
  next();
};

export default requestLoggingMiddleware;
