const { Router } = require("express");
const productRouter = Router();
const productController = require("../controllers/products-controller");
const orderController = require("../controllers/orders-controller");

productRouter.get("", (req, res) => {
    productController.getProducts().then((data) => {
        res.render("../mvc/views/shopping-page/index.ejs", {elements: data})
    });
});

productRouter.get("/percategory", productController.NumberOfProductsByCategory);

//productRouter.post("/changeproduct", productController.updateproduct);
productRouter.post("/",productController.createProduct);

productRouter.route("/:id")
    .get(productController.getProductById);

productRouter.route("/:title").delete(productController.deleteProduct).put(productController.updateProduct);


productRouter.post("/createorder", orderController.createOrder);

productRouter.get("/AvgPerMonth", orderController.getAvgOrdersPerMonth);

productRouter.post("/productFilter", productController.productFilter);

module.exports = productRouter;
