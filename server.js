const express = require("express");
const app = express();

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

const port = 3000;
app.listen(port, () =>
  console.log(`Server is listening: http://localhost:${port}`)
);
