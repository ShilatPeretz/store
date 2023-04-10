const { Router } = require("express");
const productRouter = Router();
const productController = require("../controllers/products-controller");
const statusMSG = require("../../public/json/status-messages.json");

productRouter.get("/", async (req, res, next) => {
  res.locals.products = await productController.getProducts();
  console.log("passing");
  next();
});

productRouter.get(
  "/percategory",
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
  productController.NumberOfProductsByCategory
);

productRouter.post(
  "/",
  function (req, res, next) {
    if (req.session && req.session.isAdmin) {
      next();
    } else {
      res.status(400).send("error while creating a product");
    }
  },
  productController.createProduct
);

productRouter.get("/productFilter", productController.productFilter);
//maybe problem with filter is here - consider removing middle functions for post,put and delete functions.

productRouter
  .route("/:title")
  .delete(function (req, res, next) {
    if (req.session && req.session.isAdmin) {
      next();
    } else {
      res.status(400).send("error while deleting a product");
    }
  }, productController.deleteProduct)
  .put(function (req, res, next) {
    if (req.session && req.session.isAdmin) {
      next();
    } else {
      res.status(400).send("error while editing a product");
    }
  }, productController.updateProduct)
  .get(productController.getProductByTitle);

module.exports = productRouter;
