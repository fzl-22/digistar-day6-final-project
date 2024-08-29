const { validationResult } = require("express-validator");

let users = [];

const getUsers = (req, res, next) => {
  res.status(200).json({
    message: "Successfully fetched data!",
    data: {
      users: users,
    },
  });
};

const searchUsers = (req, res, next) => {
  try {
    const { name, email } = req.query;

    if (!name && !email) {
      return res.status(200).json({
        message: "Successfully fetched users!",
        data: {
          users: users,
        },
      });
    }

    const filteredUsers = users.filter(
      (user) =>
        (name && user.name.toLowerCase().includes(name.toLowerCase())) ||
        (email && user.email.toLowerCase().includes(email.toLowerCase()))
    );

    res.status(200).json({
      message: "Successfully fetched users",
      data: {
        users: filteredUsers,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getUserById = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation error");
      error.status = 422;
      error.data = errors.array();
      throw error;
    }

    const userId = req.params.userId;

    // if user does not exist, throw error
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    const user = users[userIndex];
    res.status(200).json({
      message: "User found!",
      data: {
        user: user,
      },
    });
  } catch (err) {
    next(err);
  }
};

const createUser = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation error");
      error.status = 422;
      error.data = errors.array();
      throw error;
    }

    const { name, email } = req.body;

    // if email already exists, throw error
    const emailExists = users.find((user) => user.email === email);
    if (emailExists) {
      const error = new Error("Email already exists. Aborting.");
      error.status = 409;
      throw error;
    }

    const id = new Date().toISOString();
    const user = {
      id: id,
      name: name,
      email: email,
    };

    users.push(user);
    res.status(200).json({
      message: "Successfully added user!",
      data: {
        user: user,
      },
    });
  } catch (err) {
    next(err);
  }
};

const editUser = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation error");
      error.status = 422;
      error.data = errors.array();
      throw error;
    }

    const userId = req.params.userId;

    // if user does not exist, throw error
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    const { name, email } = req.body;

    const updatedUser = {
      id: userId,
      name: name || users[userIndex].name,
      email: email || users[userIndex].email,
    };

    users[userIndex] = updatedUser;

    res.status(200).json({
      message: "Succesully updated user",
      data: {
        user: updatedUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation error");
      error.status = 422;
      error.data = errors.array();
      throw error;
    }

    const userId = req.params.userId;

    // if user does not exist, throw error
    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }

    users.splice(userIndex, 1);

    res.status(200).json({
      message: "Successfully deleted user",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsers,
  searchUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
};
