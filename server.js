const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const userRouter = require("./mvc/routes/user-router");
const accountRouter = require("./mvc/routes/my-account");
const productRouter = require("./mvc/routes/product-router");
const locationtRouter = require("./mvc/routes/location-router");
const ProductModel = require("./mvc/models/products-model");
const session = require("express-session");
const path = require("path");
var http = require("http").createServer(app);
var io = require("socket.io")(http);
// //**********
// const newLocal = require("custom-env");
// newLocal.env(process.env.NODE_ENV, "./config");
// //******* */

// try to match request to files in 'views' folder
app.use(express.static("views"));

app.set("view engine", "ejs");

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

//helps read the data sent in post request
app.use(express.urlencoded({ extended: true })); // parses form-data format

app.use(
  session({
    secret: "foo",
    saveUninitialized: false,
    resave: false,
  })
);
app.use(express.static(path.join(__dirname, "public")));
// try to match request to files in 'views' folder

app.use("/location", locationtRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/account", accountRouter);

io.on("connection", (socket) => {
  console.log("new connection");

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
  socket.on("removeProduct", (msg) => {
    io.emit("removeProdutFinal", msg);
  });

  socket.on("addProduct", (msg) => {
    io.emit("addProductFinal", msg);
  });

  socket.on("editProduct", (msg) => {
    io.emit("editProductFinal", msg);
  });
});

const port = 3000;
http.listen(port, () =>
  console.log(`Server is listening: http://localhost:${port}/home-page/`)
);
