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
  await usersService.findUserEmail(req.body.email).then(function (result) {
    req.session.email = result.email;
    req.session.isAdmin = result.isAdmin;
  });
  res.json({ message: "Logged in successfully", user });
};

//cookie functions **************************************
function isLoggedIn(req, res, next) {
  if (req.session.email != null) {
    res.redirect(
      `http://localhost:3000/home-page?admin=${req.session.isAdmin}`
    );
  } else {
    res.redirect("http://localhost:3000/login-signup");
  }
}

function foo(req, res) {
  res.render("foo", { _id: req.session._id });
}

function logOut(req, res) {
  req.session.destroy(() => {
    res.redirect("http://localhost:3000/home-page");
  });
}

function logged(req, res, next) {
  if (req.session.email != null) {
    res.redirect(
      `http://localhost:3000/home-page?admin=${req.session.isAdmin}`
    );
  } else {
    res.redirect(`http://localhost:3000/home-page`);
  }
}

function isAdmin(req, res) {
  if (req.session.admin == "true") {
    res.json({ message: "true" });
  } else {
    res.json({ message: "false" });
  }
}
//********************************************************

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
  isLoggedIn,
  logged,
  logOut,
  foo,
  isAdmin,
};
