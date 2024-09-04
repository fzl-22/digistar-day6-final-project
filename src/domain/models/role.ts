import mongoose from "mongoose";
import getUniqueId from "../../core/util/uuid";

interface RoleDocument extends Document {
  roleId: string;
  rolename: string;
  createdAt: Date;
  updatedAt: Date;
}

const roleSchema = new mongoose.Schema<RoleDocument>(
  {
    roleId: {
      type: String,
      required: true,
      default: getUniqueId(),
      unique: true,
    },
    rolename: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Role = mongoose.model<RoleDocument>("Role", roleSchema);

export { RoleDocument, Role };
