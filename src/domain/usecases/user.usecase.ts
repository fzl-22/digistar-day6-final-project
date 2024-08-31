import bcrypt from "bcryptjs";
import { HttpError } from "../../core/errors";
import { User } from "../models/user";
import { userRepository } from "../repositories/user.repository";

export class UserUsecase {
  static getUsers(): User[] {
    return userRepository.findAll();
  }

  static searchUsers(name?: string, email?: string): User[] {
    if (!name && !email) {
      return userRepository.findAll(); // Return all users if both name and email are not provided
    }

    return userRepository
      .findAll()
      .filter(
        (user) =>
          (name && user.name.toLowerCase().includes(name.toLowerCase())) ||
          (email && user.email.toLowerCase().includes(email.toLowerCase()))
      );
  }

  static getUserById(userId: string): User {
    const user = userRepository.findById(userId);
    if (!user) {
      throw new HttpError(404, "User not found.");
    }
    return user;
  }

  static async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const emailExists = userRepository.findByEmail(email);
    if (emailExists) {
      throw new HttpError(
        409,
        "Email already exists. Please use another email."
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    userRepository.add(user);
    return user;
  }

  static updateUser(userId: string, name?: string, email?: string): User {
    const updatedUser = userRepository.update(userId, { name, email });
    if (!updatedUser) {
      throw new HttpError(404, "User not found.");
    }
    return updatedUser;
  }

  static deleteUser(userId: string): boolean {
    const isDeleted = userRepository.delete(userId);
    if (!isDeleted) {
      throw new HttpError(404, "User not found.");
    }

    return isDeleted;
  }
}
