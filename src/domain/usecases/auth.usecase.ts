import bcrypt from "bcryptjs";

import { HttpError } from "../../core/errors";
import { IUser } from "../models/user";
import { userRepository } from "../repositories/user.repository";
import { authRepository } from "../repositories/auth.repository";

export class AuthUsecase {
  static async register(userData: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<IUser> {
    const duplicateUser = await userRepository.findDuplicates({
      username: userData.username,
      email: userData.email,
    });
    if (duplicateUser) {
      throw new HttpError(
        409,
        "Email or username already exists. Please use another email or username."
      );
    }

    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const user = await authRepository.register({
      ...userData,
      password: hashedPassword,
    });

    return user;
  }
}
