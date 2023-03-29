const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const userRouter = require("./mvc/routes/user-router");
const accountRouter = require("./mvc/routes/my-account");
const productRouter = require("./mvc/routes/product-router");
const locationtRouter = require("./mvc/routes/location-router");
var http = require("http").createServer(app);
var io = require("socket.io")(http);
// //**********
// const newLocal = require("custom-env");
// newLocal.env(process.env.NODE_ENV, "./config");
// //******* */
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/shopping-page/index.html");
});

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
app.set("view engine", "ejs");
//helps read the data sent in post request
app.use(express.urlencoded({ extended: true })); // parses form-data format

const session = require("express-session");
app.use(
  session({
    secret: "foo",
    saveUninitialized: false,
    resave: false,
  })
);

// try to match request to files in 'views' folder
app.use(express.static("views"));

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
    socket.broadcast.emit("addProductFinal", msg);
  });

  socket.on("editProduct", (msg) => {
    io.emit("editProductFinal", msg);
  });
});
const port = 3000;
http.listen(port, () =>
  console.log(`Server is listening: http://localhost:${port}/home-page/`)
);
