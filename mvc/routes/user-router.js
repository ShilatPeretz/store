const { Router } = require("express");
const userRouter = Router();
const UserController = require("../controllers/users-controller");

userRouter.post("/signup", UserController.createUser);

userRouter.get("/login", (req, res) => {
  console.log(req.body);
  res.send("login to user");
});

userRouter.get("/exit", (req, res) => {
  res.redirect("http://localhost:3000/home-page.html");
});

module.exports = userRouter;
