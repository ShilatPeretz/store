const { Router } = require("express");
const productRouter = Router();
const productController = require("../controllers/products-controller");
const orderController = require("../controllers/orders-controller");
const countries = require('../../public/countires.json');
const sizes = require('../../public/size.json');
const colors = require('../../public/colors.json');
const categories = require('../../public/category.json');
productRouter.get("", (req, res) => {
    productController.getProducts().then((data) => {
        res.render("../mvc/views/shopping-page/index.ejs", {elements: data, countries : countries, sizes: sizes, colors: colors, categories: categories})
    });
});

productRouter.get("/percategory", productController.NumberOfProductsByCategory);

productRouter.post("/",productController.createProduct);
productRouter.get("/AvgPerMonth", orderController.getAvgOrdersPerMonth);
productRouter.get("/productFilter", productController.productFilter);


productRouter.route("/:title")
.delete(productController.deleteProduct)
.put(productController.updateProduct)
.get(productController.getProductByTitle);






module.exports = productRouter;
