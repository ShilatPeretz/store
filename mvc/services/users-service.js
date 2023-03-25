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
  return await User.find();
};

const login = async (email, password) => {
  console.log({ email, password });
  return await User.findOne({ email, password });
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const updateUser = async (id, username, email, password) => {
  const user = await getUserById(id);
  if (!user) return null;

  user.username = username;
  user.email = email;
  user.password = password;
  await user.save();
  return user;
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
  login,
};
