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

export default {
  validateCreateRole,
  validateUpdateRole,
  validateDeleteRole,
};
