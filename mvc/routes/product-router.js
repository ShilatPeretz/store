const { Router } = require("express");
const productRouter = Router();
const productController = require("../controllers/products-controller");
const orderController = require("../controllers/orders-controller");

productRouter.get("/", productController.getProducts);

productRouter.get("/percategory", productController.NumberOfProductsByCategory);

//productRouter.post("/changeproduct", productController.updateproduct);

productRouter.post("/createproduct", productController.createProduct);

productRouter.post("/createorder", orderController.createOrder);

productRouter.get("/AvgPerMonth", orderController.getAvgOrdersPerMonth);

productRouter.post("/productFilter", productController.productFilter);

module.exports = productRouter;
