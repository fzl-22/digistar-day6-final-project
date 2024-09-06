import { UpdateQuery } from "mongoose";
import { User, IUser } from "../models/user";
import { ObjectId } from "mongodb";

class UserRepository {
  async findAll(): Promise<IUser[]> {
    const users = await User.find().populate("role");
    return users;
  }

  async findById(userId: string): Promise<IUser | null> {
    const user = await User.findById(userId).populate("role");
    return user;
  }

  async findDuplicates(
    criteria: { username?: string; email?: string },
    excludeUserId?: string
  ): Promise<IUser | null> {
    const queryConditions: any[] = [];
    if (criteria.username) {
      queryConditions.push({ username: criteria.username });
    }
    if (criteria.email) {
      queryConditions.push({ email: criteria.email });
    }
    if (queryConditions.length === 0) {
      return null;
    }

    const query: any = { $or: queryConditions };
    if (excludeUserId) {
      query._id = { $ne: new ObjectId(excludeUserId) };
    }
    return await User.findOne(query);
  }

  async search(username?: string, email?: string): Promise<IUser[]> {
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

  async update(
    userId: string,
    updatedUser: UpdateQuery<IUser>
  ): Promise<IUser | null> {
    return await User.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    }).populate("role");
  }

  async delete(userId: string): Promise<boolean> {
    const result = await User.deleteOne({ _id: new ObjectId(userId) });
    return result.deletedCount > 0;
  }
}

// create a repository singleton instance
export const userRepository = new UserRepository();
