import mongoose from "mongoose";
import getUniqueId from "../../core/util/uuid";
import { RoleDocument } from "./role";

interface UserDocument extends Document {
  userId: string;
  username: string;
  email: string;
  password: string;
  role?: mongoose.Types.ObjectId | RoleDocument;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      default: getUniqueId(),
    },
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
    },
  },
  { timestamps: true }
);

const User = mongoose.model<UserDocument>("User", userSchema);

export { UserDocument, User };
