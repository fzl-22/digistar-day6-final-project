import { UpdateQuery } from "mongoose";
import { User, UserDocument } from "../models/user";

class UserRepository {
  async findAll(): Promise<UserDocument[]> {
    const users = await User.find().populate("role");
    return users;
  }

  async findById(userId: string): Promise<UserDocument | null> {
    const user = await User.findOne({ userId: userId }).populate("role");
    return user;
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    const user = await User.findOne({ email: email }).populate("role");
    return user;
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    const user = await User.findOne({ username: username }).populate("role");
    return user;
  }

  async isUserExists(username: string, email: string): Promise<boolean> {
    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    return !!user;
  }

  async search(username?: string, email?: string): Promise<UserDocument[]> {
    const queryConditions: any[] = [];

    if (username) {
      queryConditions.push({ username: { $regex: new RegExp(username, "i") } });
    }

    if (email) {
      queryConditions.push({ email: { $regex: new RegExp(email, "i") } });
    }

    if (queryConditions.length === 0) {
      return [];
    }

    return await User.find({ $or: queryConditions }).populate("role");
  }

  async add(userData: Partial<UserDocument>): Promise<UserDocument> {
    const user = new User(userData);
    return (await user.save()).populate("role");
  }

  async update(
    userId: string,
    updatedUser: UpdateQuery<UserDocument>
  ): Promise<UserDocument | null> {
    return await User.findOneAndUpdate({ userId }, updatedUser, {
      new: true,
    }).populate("role");
  }

  async delete(userId: string): Promise<boolean> {
    const result = await User.deleteOne({ userId: userId });
    return result.deletedCount > 0;
  }
}

// create a repository singleton instance
export const userRepository = new UserRepository();
