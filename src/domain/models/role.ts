import mongoose from "mongoose";
import { IDocument } from "../../core/types/interfaces";

interface IRole extends IDocument<IRole> {
  _id: mongoose.Schema.Types.ObjectId;
  rolename: string;
  createdAt: Date;
  updatedAt: Date;
}

const roleSchema = new mongoose.Schema<IRole>(
  {
    rolename: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Role = mongoose.model<IRole>("Role", roleSchema);

export { IRole, Role };
