const usersService = require("../services/users-service");
const cookieParser = require('cookie-parser');
const createUser = async (req, res) => {
  let tmp = await usersService.findUserName(req.body.username);
  console.log('password: ' + req.body.password);
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
  res.json(newUser);//consider adding statuses
};

const getIdByUsername = async (req, res) => {
  const username = req.session.user.username;
  const user = await usersService.findUserName(username);
  if(!user)
  {
    return res.status(404).send('User not found!');
  }
  const userId = user._id;
  res.json({userId});
};

const loginUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log('username',username,'password',password);
  const user = await usersService.findUserName(username);
  if(!user)
  {
    return res.send('User not found');
    
  }
  const isMatching = await usersService.comparePasswords(password, user.password);
  if (!isMatching)
  {
    return res.send('Password is incorrect!');
  }
  req.session.user = user;
  //res.cookie('usernameCookie', username, { maxAge: 900000, httpOnly: true, secure: true });
  console.log('created a cookie!');
  if(user.isAdmin)
  {
      req.session.isAdmin = true;
  }
  else
  {
      req.session.isAdmin = false;
  }

  res.json(user);

};

//cookie functions **************************************
// function isLoggedIn(req, res) {
//   if(req.session.userId)
//   {
//     const user = usersService.getUserById(req.session.userId);
//     res.json(user);
//   }
//   else
//   {
//     res.send('Not logged in!');
//   }
// }


function logOut(req, res) {

  res.clearCookie('usernameCookie');

  req.session.destroy(function(err){

    if(err) res.status(500).send('error while logging out',err);
    else res.status(200).send('successfully logged out!');
    
  });

}

// function logged(req, res, next) {
//   if (req.session.email != null) {
//     res.redirect(
//       `http://localhost:3000/home-page?admin=${req.session.isAdmin}`
//     );
//   } else {
//     res.redirect(`http://localhost:3000/home-page`);
//   }
// }

// function isAdmin(req, res) {
//   if (req.session.admin == "true") {
//     res.json({ message: "true" });
//   } else {
//     res.json({ message: "false" });
//   }
// }
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
  logOut,
  getIdByUsername,
};
