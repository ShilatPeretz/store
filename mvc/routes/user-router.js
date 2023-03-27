const { Router } = require("express");
const userRouter = Router();
const UserController = require("../controllers/users-controller");

userRouter.post("/signup", UserController.createUser);

userRouter.post("/login", UserController.loginUser);

userRouter.get("/isLogged", UserController.isLoggedIn, UserController.foo);

userRouter.get("/logged", UserController.logged, UserController.foo);

userRouter.get("/logout", UserController.logOut);

module.exports = userRouter;
