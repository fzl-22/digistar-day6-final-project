import bcrypt from "bcryptjs";
import { HttpError } from "../../core/errors";
import { IUser } from "../models/user";
import { userRepository } from "../repositories/user.repository";

export class UserUsecase {
  static async getUsers(): Promise<IUser[]> {
    return await userRepository.findAll();
  }

  static async searchUsers(
    username?: string,
    email?: string
  ): Promise<IUser[]> {
    const users = await userRepository.search(username, email);
    return users;
  }

  static async getUserById(userId: string): Promise<IUser> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new HttpError(404, "User not found.");
    }
    return user;
  }

  static async updateUser(
    userId: string,
    userData: {
      username?: string;
      firstName?: string;
      lastName?: string;
      email?: string;
    }
  ): Promise<IUser> {
    const existingUser = await userRepository.findById(userId);
    if (!existingUser) {
      throw new HttpError(404, "User not found.");
    }

    const duplicateUser = await userRepository.findDuplicates(userData, userId);
    if (duplicateUser) {
      throw new HttpError(409, "Email or username already exists. Aborting.");
    }

    const updatedUser = await userRepository.update(userId, userData);
    if (!updatedUser) {
      throw new HttpError(400, "Failed to update user.");
    }
    return updatedUser;
  }

  static async deleteUser(userId: string): Promise<boolean> {
    const isDeleted = await userRepository.delete(userId);
    if (!isDeleted) {
      throw new HttpError(400, "Failed to delete user.");
    }

    return isDeleted;
  }
}
