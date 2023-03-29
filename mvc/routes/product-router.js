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

productRouter.post("/",productController.createProduct);

productRouter.get("/productFilter", productController.productFilter);


productRouter.route("/:title").delete(productController.deleteProduct).put(productController.updateProduct);


productRouter.get("/AvgPerMonth", orderController.getAvgOrdersPerMonth);



module.exports = productRouter;
