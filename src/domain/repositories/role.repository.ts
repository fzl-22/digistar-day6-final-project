import { Role, IRole } from "../models/role";
import { UpdateQuery } from "mongoose";
import { User } from "../models/user";
import { ObjectId } from "mongodb";

class RoleRepository {
  async findAll(): Promise<IRole[]> {
    return await Role.find();
  }

  async findById(roleId: string): Promise<IRole | null> {
    const role = await Role.findById(roleId);
    return role;
  }

  async findByName(rolename: string): Promise<IRole | null> {
    const role = await Role.findOne({ rolename: rolename });
    return role;
  }

  async add(roleData: Partial<IRole>): Promise<IRole> {
    const role = new Role({ rolename: roleData.rolename });
    return await role.save();
  }

  async update(
    roleId: string,
    updatedRole: UpdateQuery<IRole>
  ): Promise<IRole | null> {
    return await Role.findByIdAndUpdate(roleId, updatedRole, { new: true });
  }

  async delete(roleId: string): Promise<boolean> {
    const result = await Role.deleteOne({ _id: new ObjectId(roleId) });
    await User.updateMany({role: roleId}, {$set: {role: null}});
    return result.deletedCount > 0;
  }

  async assign(userId: string, roleId: string): Promise<void> {
    await User.updateOne({ _id: userId }, { $set: { role: roleId } });
  }

  async revoke(userId: string): Promise<void> {
    await User.findByIdAndUpdate(userId, { $set: { role: null } });
  }
}

export const roleRepository = new RoleRepository();
