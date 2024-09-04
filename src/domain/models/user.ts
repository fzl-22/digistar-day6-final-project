import mongoose from "mongoose";
import getUniqueId from "../../core/util/uuid";

interface UserDocument extends Document {
  userId: string;
  username: string;
  email: string;
  password: string;
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
  },
  { timestamps: true }
);

const User = mongoose.model<UserDocument>("User", userSchema);

export { UserDocument, User };
