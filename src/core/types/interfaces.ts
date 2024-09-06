import { Request } from "express";
import { IUser } from "../../domain/models/user";

export interface IDocument<T> {
  _doc: T;
}

export interface IAuthenticatedRequest extends Request {
  user?: IUser;
  isAdmin?: boolean;
}

export interface IDecodedToken {
  userId: string;
}
