const { Router } = require("express");
const productRouter = Router();
const productController = require("../controllers/products-controller");

productRouter.get("/percategory", productController.NumberOfProductsByCategory);

//productRouter.post("/changeproduct", productController.updateproduct);

productRouter.post("/createproduct", productController.createProduct);

module.exports = productRouter;
