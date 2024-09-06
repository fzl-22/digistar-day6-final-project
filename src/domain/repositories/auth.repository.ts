import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { IUser, User } from "../models/user";
import { HttpError } from "../../core/errors";
import { JWT_SECRET_KEY } from "../../core/config/env";

class AuthRepository {
  async register(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return await user.save();
  }

  async login(authData: {
    email: string;
    password: string;
  }): Promise<{ user: IUser; token: string }> {
    const user = await User.findOne({ email: authData.email });
    if (!user) {
      throw new HttpError(401, "Invalid email or password.");
    }

    const isPasswordEqual = await bcrypt.compare(
      authData.password,
      user.password
    );
    if (!isPasswordEqual) {
      throw new HttpError(401, "Invalid email or password.");
    }

    const token = this.generateToken(user);
    return { user, token };
  }

  private generateToken(user: IUser): string {
    const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    return token;
  }
}

export const authRepository = new AuthRepository();
