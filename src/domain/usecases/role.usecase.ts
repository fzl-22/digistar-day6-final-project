import { HttpError } from "../../core/errors";
import { RoleDocument } from "../models/role";
import { roleRepository } from "../repositories/role.repository";
import { userRepository } from "../repositories/user.repository";

export class RoleUsecase {
  static async getRoles(): Promise<RoleDocument[]> {
    return await roleRepository.findAll();
  }

  static async createRole(rolename: string): Promise<RoleDocument> {
    const isRoleExists = await roleRepository.findByName(rolename);
    if (isRoleExists) {
      throw new HttpError(
        409,
        "Role already exists. Please create with another name."
      );
    }

    const role = await roleRepository.add({ rolename: rolename });
    return role;
  }

  static async updateRole(
    roleId: string,
    roleData: { rolename?: string }
  ): Promise<RoleDocument> {
    const isRoleExists = await roleRepository.findById(roleId);
    console.log(isRoleExists);
    if (!isRoleExists) {
      throw new HttpError(404, "Role not found.");
    }

    if (roleData.rolename) {
      const roleWithDuplicateName = await roleRepository.findByName(
        roleData.rolename
      );
      if (roleWithDuplicateName && roleWithDuplicateName.roleId !== roleId) {
        throw new HttpError(409, "Role name already exists. Aborting.");
      }
    }

    const updatedRole = await roleRepository.update(roleId, {
      rolename: roleData.rolename,
    });
    if (!updatedRole) {
      throw new HttpError(400, "Failed to update role.");
    }
    return updatedRole;
  }

  static async deleteRole(roleId: string): Promise<boolean> {
    const isDeleted = await roleRepository.delete(roleId);
    if (!isDeleted) {
      throw new HttpError(400, "Failed to delete role.");
    }

    return isDeleted;
  }

  static async assignRole(userId: string, roleId: string): Promise<void> {
    const userExists = await userRepository.findById(userId);
    if (!userExists) {
      throw new HttpError(404, "User not found.");
    }

    const roleExists = await roleRepository.findById(roleId);
    if (!roleExists) {
      throw new HttpError(404, "Role not found.");
    }

    await roleRepository.assign(userId, roleId);
  }

  static async revokeRole(userId: string): Promise<void> {
    const userExists = await userRepository.findById(userId);
    if (!userExists) {
      throw new HttpError(404, "User not found.");
    }

    await roleRepository.revoke(userId);
  }
}
