import { param, body } from "express-validator";

const validateUpdateUser = () => {
  return [
    body("username").optional().trim(),
    body("firstName").optional().trim(),
    body("lastName").optional().trim(),
    body("email").optional().trim().isEmail(),
  ];
};


export default {
  validateUpdateUser,
};
