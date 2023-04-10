const { Router } = require("express");
const userRouter = Router();
const UserController = require("../controllers/users-controller");
const statusMSG = require("../../public/json/status-messages.json");

userRouter.post("/signup", UserController.createUser);

userRouter.post("/login", UserController.loginUser);

// userRouter.post("/isLogged",function(req, res, next){
//     if(req.session && req.session.isAdmin)
//     {
//         next();
//     }
//     else
//     {
//         res.render(__dirname + "/../views/error/error",{status: 403, msg: statusMSG[403]});
//     }
// }, UserController.isLoggedIn);

// userRouter.get("/isAdmin", UserController.isAdmin, UserController.foo);

// userRouter.get("/logged", UserController.logged, UserController.foo);

userRouter.get(
  "/",
  function (req, res, next) {
    //console.log(typeof req.session.user.username, typeof req.params.username)
    //console.log(req.session.user.username + " hey" + " " + req.params.username)
    if (req.session && req.session.user) {
      console.log("nexting");
      next();
    } else {
      res.status(400).send("error while a get request");
    }
  },
  UserController.getIdByUsername
);

userRouter.post("/logout", UserController.logOut);

module.exports = userRouter;
