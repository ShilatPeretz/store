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
  return await User.findOne({ email, password });
};

const findUserName = async (username) => {
  return await User.findOne({ username });
};

const findUserEmail = async (email) => {
  return await User.findOne({ email });
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const updateUser = async (id, username, email, password) => {
  const user = await getUserById(id);
  if (!user) return null;

  //check if user name or email don't exist
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
  findUserName,
  findUserEmail,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  login,
};
