const express = require("express");
const app = express();
const userRouter = require("./mvc/routes/user-router");

app.use(express.json()); // parses json format
app.use(express.urlencoded({ extended: true })); // parses form-data format

// try to match request to files in 'views' folder
app.use(express.static("views"));

//conect to user
app.post("/conect", (req, res) => {
  res.redirect("mvc/view/Login-Signin.html");
});

app.get("/login", (req, res) => {
  //mongo db verify usr
  //if
  res.post("mvc/view/home-page");
});

app.get("/signup", (req, res) => {
  //mongo db check user data is okay
  //add user to DB
});

app.use("/users", userRouter);

const port = 3000;
app.listen(port, () =>
  console.log(`Server is listening: http://localhost:${port}`)
);
