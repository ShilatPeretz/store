const OrdersServices = require("../services/Orders-service");
const ProductController = require("../controllers/products-controller");

//check return functions
const createOrder = async (req, res) => {
  const newOrder = await OrdersServices.createOrder(
    req.body.date,
    req.body.userID,
    req.body.products,
    req.body.price
  );
  //go through products and decrease stock num
  for (let p in products) {
    var id = p;
    var num = products[p];
    ProductController.updateProductStock(id, num);
  }
  res.json(newOrder);
};

const getOrders = async (req, res) => {
  const orders = await OrdersServices.getOrders();
  res.json(orders);
};

const getOrdersByUser = async (req, res) => {
  const orders = await OrdersServices.getOrdersByUser(req.body.userID);
  res.json(orders);
};

const getOrderById = async (req, res) => {
  const order = await OrdersServices.getOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({ errors: ["Order not found"] });
  }

  res.json(order);
};

const updateOrder = async (req, res) => {
  //make sure to send all the data
  if (!req.body.products) {
    res.status(400).json({
      message: "the order must have products in it",
    });
  }

  const order = await OrdersServices.updateOrder(
    req.params.id,
    req.body.date,
    req.body.userID,
    req.body.products,
    req.body.price
  );
  if (!order) {
    return res.status(404).json({ errors: ["Order not found"] });
  }

  res.json(order);
};

const deleteOrder = async (req, res) => {
  const order = await OrdersServices.deleteOrder(req.params.id);
  if (!order) {
    return res.status(404).json({ errors: ["Order not found"] });
  }
  res.send();
};

module.exports = {
  createOrder,
  getOrdersByUser,
  getOrders,
  getOrderById,
  getOrder,
  updateOrder,
  deleteOrder,
};
