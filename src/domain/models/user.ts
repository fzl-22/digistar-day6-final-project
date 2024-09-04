import mongoose from "mongoose";
import getUniqueId from "../../core/util/uuid";
import { RoleDocument } from "./role";

interface UserDocument extends Document {
  userId: string;
  username: string;
  email: string;
  password: string;
  role?: String | RoleDocument;
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
      type: String,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    virtuals: true,
  }
);

userSchema.virtual("roles", {
  ref: "Role",
  localField: "role",
  foreignField: "roleId",
  justOne: true,
});

const User = mongoose.model<UserDocument>("User", userSchema);

export { UserDocument, User };
