import { NextFunction, Request, Response } from "express";
import { RoleUsecase } from "../../domain/usecases/role.usecase";
import { validationResult } from "express-validator";
import { HttpError } from "../../core/errors";

const getRoles = async (req: Request, res: Response, next: NextFunction) => {
  const roles = await RoleUsecase.getRoles();
  res.status(200).json({
    message: "Successfully fetched roles!",
    data: {
      roles: roles,
    },
  });
};

type CreateRoleBody = { rolename: string };
const createRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new HttpError(422, "Validation error", errors.array());
      throw error;
    }

    const { rolename } = req.body as CreateRoleBody;

    const role = await RoleUsecase.createRole(rolename);
    res.status(201).json({
      message: "Role created successfully!",
      data: {
        role: role,
      },
    });
  } catch (err) {
    next(err);
  }
};

type UpdateRoleParams = { roleId: string };
type UpdateRoleBody = { rolename?: string };
const updateRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new HttpError(422, "Validation error", errors.array());
      throw error;
    }

    const { roleId } = req.params as UpdateRoleParams;
    const { rolename } = req.body as UpdateRoleBody;

    const role = await RoleUsecase.updateRole(roleId, { rolename });

    return res.status(200).json({
      message: "Role updated successfully!",
      data: {
        role: role,
      },
    });
  } catch (err) {
    next(err);
  }
};

type DeleteRoleParams = { roleId: string };
const deleteRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new HttpError(422, "Validation error", errors.array());
      throw error;
    }

    const { roleId } = req.params as DeleteRoleParams;

    await RoleUsecase.deleteRole(roleId);

    return res.status(200).json({
      message: "Role deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

type AssignRoleParams = { userId: string };
type AssignRoleBody = { roleId: string };
const assignRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new HttpError(422, "Validation error", errors.array());
      throw error;
    }

    const { userId } = req.params as AssignRoleParams;
    const { roleId } = req.body as AssignRoleBody;

    await RoleUsecase.assignRole(userId, roleId);

    return res.status(200).json({
      message: "Role assigned successfully!",
    });
  } catch (err) {
    next(err);
  }
};

type RevokeRoleParams = { userId: string };
const revokeRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new HttpError(422, "Validation error", errors.array());
      throw error;
    }

    const { userId } = req.params as RevokeRoleParams;

    await RoleUsecase.revokeRole(userId);

    return res.status(200).json({
      message: "Role revoked successfully!",
    });
  } catch (err) {
    next(err);
  }
};


export default {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  assignRole,
  revokeRole,
};
