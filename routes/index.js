const { Router } = require("express");

const controllers = require("../controllers");
const validators = require("../validators");

const router = Router();

router.get("/", controllers.getUsers);

router.get("/users/search", controllers.searchUsers)

router.get(
  "/users/:userId",
  [validators.validateGetUserById()],
  controllers.getUserById
);

router.post(
  "/users",
  [validators.validateCreateUser()],
  controllers.createUser
);

router.put(
  "/users/:userId",
  [validators.validateUpdateUser()],
  controllers.editUser
);

router.delete(
  "/users/:userId",
  [validators.validateDeleteUser()],
  controllers.deleteUser
);

module.exports = router;
