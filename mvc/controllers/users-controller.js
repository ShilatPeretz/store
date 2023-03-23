const usersService = require("../services/users-service");

const createUser = async (req, res) => {
  const newUser = await usersService.createUser(
    req.body.username,
    req.body.email,
    req.body.password
  );
  res.json(newUser);
};

const getUsers = async (req, res) => {
  const Users = await usersService.getUsers();
  res.json(Users);
};

const getUser = async (req, res) => {
  const User = await usersService.getUserById(req.params.id);
  if (!User) {
    return res.status(404).json({ errors: ["User not found"] });
  }

  res.json(User);
};

const updateUser = async (req, res) => {
  if (!req.body.title) {
    res.status(400).json({
      message: "title is required",
    });
  }

  const User = await usersService.updateUser(req.params.id, req.body.title);
  if (!User) {
    return res.status(404).json({ errors: ["User not found"] });
  }

  res.json(User);
};

const deleteUser = async (req, res) => {
  const User = await usersService.deleteUser(req.params.id);
  if (!User) {
    return res.status(404).json({ errors: ["User not found"] });
  }

  res.send();
};

module.exports = {
  createUser: createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
