import { Router } from "express";

import controllers from "../handlers/controllers/user.controller";
import validators from "../handlers/validators/user.validator";

const router = Router();

router.get("/", controllers.getUsers);

router.get("/search", controllers.searchUsers);

router.get(
  "/:userId",
  validators.validateGetUserById(),
  controllers.getUserById
);

router.post("/", validators.validateCreateUser(), controllers.createUser);

router.put(
  "/:userId",
  validators.validateUpdateUser(),
  controllers.updateUser
);

router.delete(
  "/:userId",
  validators.validateDeleteUser(),
  controllers.deleteUser
);

export default router;
