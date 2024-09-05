import { Role, RoleDocument } from "../models/role";
import { UpdateQuery } from "mongoose";
import { User } from "../models/user";

class RoleRepository {
  async findAll(): Promise<RoleDocument[]> {
    return await Role.find();
  }

  async findById(roleId: string): Promise<RoleDocument | null> {
    const role = await Role.findOne({ roleId: roleId });
    return role;
  }

  async findByName(rolename: string): Promise<RoleDocument | null> {
    const role = await Role.findOne({ rolename: rolename });
    return role;
  }

  async add(roleData: Partial<RoleDocument>): Promise<RoleDocument> {
    const role = new Role({ rolename: roleData.rolename });
    return await role.save();
  }

  async update(
    roleId: string,
    updatedRole: UpdateQuery<RoleDocument>
  ): Promise<RoleDocument | null> {
    return await Role.findOneAndUpdate({ roleId }, updatedRole, { new: true });
  }

  async delete(roleId: string): Promise<boolean> {
    const result = await Role.deleteOne({ roleId: roleId });
    await User.updateMany({role: roleId}, {$set: {role: null}});
    return result.deletedCount > 0;
  }

  async assign(userId: string, roleId: string): Promise<void> {
    await User.updateOne({ userId: userId }, { $set: { role: roleId } });
  }

  async revoke(userId: string): Promise<void> {
    await User.updateOne({ userId: userId }, { $set: { role: null } });
  }
}

export const roleRepository = new RoleRepository();
