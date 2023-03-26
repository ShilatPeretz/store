const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const userRouter = require("./mvc/routes/user-router");
const accountRouter = require("./mvc/routes/my-account");
const productRouter = require("./mvc/routes/product-router");
//**********
const newLocal = require("custom-env");
newLocal.env(process.env.NODE_ENV, "./config");
//******* */

mongoose
  .connect(
    "mongodb://admin:admin@ac-hb0n2yh-shard-00-00.zbtvvfi.mongodb.net:27017,ac-hb0n2yh-shard-00-01.zbtvvfi.mongodb.net:27017,ac-hb0n2yh-shard-00-02.zbtvvfi.mongodb.net:27017/?ssl=true&replicaSet=atlas-vg3yrv-shard-0&authSource=admin&retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to mongoDb");
  });

app.use(cors());
app.use(express.json()); // parses json format
app.use(express.urlencoded({ extended: true })); // parses form-data format

// try to match request to files in 'views' folder
app.use(express.static("views"));

app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/account", accountRouter);

const port = 3000;
app.listen(port, () =>
  console.log(`Server is listening: http://localhost:${port}/home-page/`)
);
