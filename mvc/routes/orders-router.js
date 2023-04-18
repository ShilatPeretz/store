const { Router } = require("express");
const ordersRouter = Router();
const orderController = require("../controllers/orders-controller");
const statusMSG = require("../../public/json/status-messages.json");

ordersRouter.get(
  "/AvgPerMonth",
  function (req, res, next) {
    if (req.session && req.session.isAdmin) {
      next();
    } else {
      res.render(__dirname + "/../views/error/error", {
        status: 403,
        msg: statusMSG[403],
      });
    }
  },
  orderController.getAvgOrdersPerMonth
);

ordersRouter.get("/items/:orderId", orderController.getOrderItemsByOrderId);

ordersRouter.post(
  "/",
  function (req, res, next) {
    if (req.session && req.session.user) {
      next();
    } else {
      res.status(400).send("error while checking out");
    }
  },
  orderController.createOrder
);

module.exports = ordersRouter;
