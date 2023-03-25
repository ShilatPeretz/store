const { Router } = require("express");
const userRouter = Router();
const UserController = require("../controllers/users-controller");

userRouter.post("/signup", UserController.createUser);

userRouter.post("/login", UserController.loginUser);

userRouter.get("/exit", (req, res) => {
  res.redirect("http://localhost:3000/home-page.html");
});

module.exports = userRouter;
