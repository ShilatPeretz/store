const { Router } = require("express");
const productRouter = Router();
const productController = require("../controllers/products-controller");
const orderController = require("../controllers/orders-controller");

productRouter.get("/", productController.getProducts);

productRouter.get("/percategory", productController.NumberOfProductsByCategory);

//productRouter.post("/changeproduct", productController.updateproduct);

productRouter.post("/createproduct", productController.createProduct);

productRouter.get("/AvgPerMonth", orderController.getAvgOrdersPerMonth);

module.exports = productRouter;
