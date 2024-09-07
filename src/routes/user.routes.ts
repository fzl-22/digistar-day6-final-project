import { Router } from "express";

import controllers from "../handlers/controllers/user.controller";
import validators from "../handlers/validators/user.validator";
import checkAuthMiddleware from "../core/middlewares/check-auth.middleware";
import checkAdminMiddleware from "../core/middlewares/check-admin.middleware";

const router = Router();

// get all users data
router.get(
  "/",
  checkAuthMiddleware,
  checkAdminMiddleware,
  controllers.getUsers
);

// search users data by email or username
router.get(
  "/search",
  checkAuthMiddleware,
  checkAdminMiddleware,
  controllers.searchUsers
);

// get single user profile
router.get(
  "/profile/:userId",
  validators.validateGetUserById(),
  checkAuthMiddleware,
  controllers.getUserById
);

// update single user profile
router.put(
  "/update/:userId",
  validators.validateUpdateUser(),
  checkAuthMiddleware,
  controllers.updateUser
);

// delete single user by profile
router.delete(
  "/delete/:userId",
  validators.validateDeleteUser(),
  checkAuthMiddleware,
  checkAdminMiddleware,
  controllers.deleteUser
);

export default router;
