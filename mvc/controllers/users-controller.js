const usersService = require("../services/users-service");

const createUser = async (req, res) => {
  var tmp = await usersService.findUserName(req.body.username);
  if (tmp !== null) {
    return res.json({ message: "User name is taken" });
  }
  var tmp = await usersService.findUserEmail(req.body.email);
  if (tmp !== null) {
    return res.json({ message: "Email is already in use" });
  }
  const newUser = await usersService.createUser(
    req.body.username,
    req.body.email,
    req.body.password
  );
  res.json(newUser);
};

const loginUser = async (req, res) => {
  const user = await usersService.login(req.body.email, req.body.password);
  if (!user) {
    return res.json({ message: "Wrong credentials" });
  }
  res.json({ message: "Logged in successfully", user });
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
  if (!req.body.username) {
    res.status(400).json({
      message: "user name is required",
    });
  }
  if (!req.body.email) {
    res.status(400).json({
      message: "email is required",
    });
  }
  if (!req.body.password) {
    res.status(400).json({
      message: "password is required",
    });
  }

  var tmp = await usersService.findUserName(req.body.username);
  if (tmp._id) {
    return res.json({ message: "User name is taken" });
  }
  var tmp = await usersService.findUserEmail(req.body.email);
  if (tmp._id) {
    return res.json({ message: "Email is already in use" });
  }

  const User = await usersService.updateUser(
    req.params.id,
    req.body.username,
    req.body.email,
    req.body.password
  );
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
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
};
