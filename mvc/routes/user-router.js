const { Router } = require("express");
const userRouter = Router();

userRouter.post("/", (req, res) => {
  console.log(req.body);
  res.send("create user");
});

module.exports = userRouter;
