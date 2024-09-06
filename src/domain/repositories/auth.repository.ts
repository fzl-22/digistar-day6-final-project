import { IUser, User } from "../models/user";

class AuthRepository {
  async register(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return (await user.save()).populate("role");
  }
}

export const authRepository = new AuthRepository();