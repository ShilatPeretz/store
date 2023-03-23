const User = require("../models/users-model");

//SERVICES
const createUser = async (username, email, password) => {
  const user = new User({
    username: username,
    email: email,
    password: password,
  });

  return await user.save();
};

const getUsers = async () => {
  return await User.find({});
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const updateUser = async (id, username, email, password) => {
  const User = await getUserById(id);
  if (!User) return null;

  User.username = username;
  User.email = email;
  User.password = password;
  await User.save();
  return User;
};

const deleteUser = async (id) => {
  const User = await getUserById(id);
  if (!User) return null;

  await User.remove();
  return User;
};

module.exports = {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
};
