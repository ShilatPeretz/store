const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const userRouter = require("./mvc/routes/user-router");
const accountRouter = require("./mvc/routes/my-account");
//**********
const newLocal = require("custom-env");
newLocal.env(process.env.NODE_ENV, "./config");
//******* */

app.use(cors());
app.use(express.json()); // parses json format
app.use(express.urlencoded({ extended: true })); // parses form-data format

// try to match request to files in 'views' folder
app.use(express.static("views"));

app.use("/users", userRouter);
app.use("/account", accountRouter);

const port = 3000;
app.listen(port, () =>
  console.log(`Server is listening: http://localhost:${port}`)
);
