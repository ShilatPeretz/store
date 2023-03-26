const { Router } = require("express");
const userRouter = Router();
const UserController = require("../controllers/users-controller");

userRouter.post("/signup", UserController.createUser);

userRouter.post("/login", UserController.loginUser);

userRouter.post("/change", UserController.updateUser);

module.exports = userRouter;
