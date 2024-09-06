import mongoose from "mongoose";
import { IRole } from "./role";
import { IDocument } from "../../core/types/interfaces";

interface IUser extends IDocument<IUser> {
  _id: mongoose.Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role?: String | IRole;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model<IUser>("User", userSchema);

export { IUser, User };
