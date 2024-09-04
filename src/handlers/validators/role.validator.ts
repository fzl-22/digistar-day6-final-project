import { param, body } from "express-validator";

const validateCreateRole = () => {
  return [
    body("rolename").trim().notEmpty().withMessage("Role name is required."),
  ];
};

const validateUpdateRole = () => {
  return [
    param("roleId").trim().notEmpty().withMessage("Invalid role ID"),
    body("rolename").optional().trim(),
  ];
};

const validateDeleteRole = () => {
  return [
    param("roleId")
      .trim()
      .notEmpty()
      .withMessage("Role ID is required"),
  ];
};

const validateAssignRole = () => {
  return [
    param("userId")
      .trim()
      .notEmpty()
      .withMessage("Role ID is required"),
    body("roleId")
      .trim()
      .notEmpty()
      .withMessage("User ID is required"),
  ];
}

const validateRevokeRole = () => {
  return [
    param("userId")
      .trim()
      .notEmpty()
      .withMessage("Role ID is required"),
  ];
}


export default {
  validateCreateRole,
  validateUpdateRole,
  validateDeleteRole,
  validateAssignRole,
  validateRevokeRole,
};
