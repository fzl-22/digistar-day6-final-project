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

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await User.findOne({ email: email }).populate("role");
    return user;
  }

  async findByUsername(username: string): Promise<IUser | null> {
    const user = await User.findOne({ username: username }).populate("role");
    return user;
  }

  async isUserExists(username: string, email: string): Promise<boolean> {
    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    return !!user;
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

  async add(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return (await user.save()).populate("role");
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
