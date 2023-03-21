const { Router, response } = require("express");
const userRouter = Router();
const costumerController = require("../controllers/costumers");

Router.ro;

userRouter.post("/signup", (req, res) => {
  const response = costumerController;

  if (response) {
    res.json({ message: "User signed successfully" });
  }
  res.json({
    message:
      "User couldn't be signed. \ntry change the users name \nor check if an account with that email already exists",
  });
});

userRouter.get("/login", (req, res) => {
  console.log(req.body);
  res.send("login to user");
});

userRouter.get("/exit", (req, res) => {
  res.redirect("http://localhost:3000/home-page.html");
});

module.exports = userRouter;
