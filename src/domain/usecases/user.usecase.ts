import bcrypt from "bcryptjs";
import { HttpError } from "../../core/errors";
import { UserDocument } from "../models/user";
import { userRepository } from "../repositories/user.repository";

export class UserUsecase {
  static async getUsers(): Promise<UserDocument[]> {
    return await userRepository.findAll();
  }

  static async searchUsers(
    username?: string,
    email?: string
  ): Promise<UserDocument[]> {
    const users = await userRepository.search(username, email);
    return users;
  }

  static async getUserById(userId: string): Promise<UserDocument> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new HttpError(404, "User not found.");
    }
    return user;
  }

  static async createUser(
    username: string,
    email: string,
    password: string
  ): Promise<UserDocument> {
    const isUserExists = await userRepository.isUserExists(username, email);
    if (isUserExists) {
      throw new HttpError(
        409,
        "Email or username already exists. Please use another email or username."
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await userRepository.add({
      username: username,
      email: email,
      password: hashedPassword,
    });

    return user;
  }

  static async updateUser(
    userId: string,
    userData: { username?: string; email?: string }
  ): Promise<UserDocument> {
    const isUserExists = await userRepository.findById(userId);
    if (!isUserExists) {
      throw new HttpError(404, "User not found.");
    }

    if (userData.email) {
      const userWithDuplicateEmail = await userRepository.findByEmail(
        userData.email
      );
      if (userWithDuplicateEmail && userWithDuplicateEmail.userId !== userId) {
        throw new HttpError(409, "Email already exists. Aborting.");
      }
    }

    if (userData.username) {
      const userWithDuplicateUsername = await userRepository.findByUsername(
        userData.username
      );
      if (
        userWithDuplicateUsername &&
        userWithDuplicateUsername.userId !== userId
      ) {
        throw new HttpError(409, "Username already exists. Aborting.");
      }
    }

    const updatedUser = await userRepository.update(userId, {
      username: userData.username,
      email: userData.email,
    });
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
