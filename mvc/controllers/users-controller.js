const usersService = require("../services/users-service");
const cookieParser = require("cookie-parser");

const createUser = async (req, res) => {
  let tmp = await usersService.findUserName(req.body.username);
  console.log("password: " + req.body.password);
  if (tmp) {
    return res.send("Username is taken");
  }
  tmp = await usersService.findUserEmail(req.body.email);
  if (tmp) {
    return res.send("Email is already in use");
  }
  const hashedPassword = await usersService.hashPassword(req.body.password, 8);
  const newUser = await usersService.createUser(
    req.body.username,
    req.body.email,
    hashedPassword
  );
  res.json(newUser); //consider adding statuses
};

const getIdByUsername = async (req, res) => {
  const username = req.session.user.username;
  const user = await usersService.findUserName(username);
  if (!user) {
    return res.status(404).send("User not found!");
  }
  const userId = user._id;
  res.json({ userId });
};


const loginUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log("username", username, "password", password);
  const user = await usersService.findUserName(username);
  if (!user) {
    return res.send("One of the details is incorrect!");
  }
  const isMatching = await usersService.comparePasswords(
    password,
    user.password
  );
  if (!isMatching) {
    return res.send("One of the details is incorrect!");
  }
  req.session.user = user;
  //res.cookie('usernameCookie', username, { maxAge: 900000, httpOnly: true, secure: true });
  console.log("created a cookie!");
  if (user.isAdmin) {
    req.session.isAdmin = true;
  } else {
    req.session.isAdmin = false;
  }

  res.json(user);
};

const validateUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await usersService.findUserName(username);
  if (!user) {
    return res.json({ message: "User Not Found" });
  }
  const isMatching = await usersService.comparePasswords(
    password,
    user.password
  );
  if (!isMatching) {
    return res.json({ message: "Password is incorrect!" });
  }
  return res.json({ message: "OK" });
};

function logOut(req, res) {
  res.clearCookie("usernameCookie");

  req.session.destroy(function (err) {
    if (err) res.status(500).send("error while logging out", err);
    else res.status(200).send("successfully logged out!");
  });
}

const getUsers = async (req, res) => {
  const Users = await usersService.getUsers();
  res.json(Users);
};

const getUser = async (req, res) => {
  const User = await usersService.getUserById(req.params.userID);
  if (!User) {
    return res.status(404).json({ errors: ["User not found"] });
  }

  res.json(User);
};

const updateUser = async (req, res) => {
  const user = usersService.findUserName(req.body.username);
  const hashedPassword = await usersService.hashPassword(req.body.password, 8);
  var NewDetails = {
    NewUsername: req.body.username,
    NewEmail: user.email,
    NewPassword: hashedPassword,
  };
  if (req.body.NewUsername) {
    NewDetails["NewUsername"] = req.body.NewUsername;
    var tmp = await usersService.findUserName(req.body.NewUsername);
    console.log(tmp);
    if (tmp) {
      return res.json({ message: "User name is taken" });
    }
  }
  if (req.body.NewEmail) {
    NewDetails["NewEmail"] = req.body.NewEmail;
    var tmp = await usersService.findUserEmail(req.body.NewEmail);
    if (tmp) {
      return res.json({ message: "Email is already in use" });
    }
  }
  if (req.body.NewPassword) {
    NewDetails["NewPassword"] = await usersService.hashPassword(
      req.body.NewPassword,
      8
    );
  }
  return;
  const User = await usersService.updateUser(
    req.params.id,
    req.body.username,
    NewDetails
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
  logOut,
  getIdByUsername,
  validateUser,
};
