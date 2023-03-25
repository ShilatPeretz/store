const productsServices = require("../services/products-service");

//check return functions
const createProduct = async (req, res) => {
  const newProduct = await productsServices.createProduct(
    req.body.description,
    req.body.category,
    req.body.color,
    req.body.size,
    req.body.price,
    req.body.img,
    req.body.stock
  );
  res.json(newProduct);
};

const loginProduct = async (req, res) => {
  console.log(req.body);
  const product = await productsServices.login(
    req.body.email,
    req.body.password
  );
  if (!product) {
    return res.json({ message: "Wrong credentials" });
  }
  res.json({ message: "Logged in successfully", product });
};

const getProducts = async (req, res) => {
  const Products = await productsServices.getProducts();
  res.json(Products);
};

const getProduct = async (req, res) => {
  const Product = await productsServices.getProductById(req.params.id);
  if (!Product) {
    return res.status(404).json({ errors: ["Product not found"] });
  }

  res.json(Product);
};

const updateProduct = async (req, res) => {
  if (!req.body.title) {
    res.status(400).json({
      message: "title is required",
    });
  }

  const Product = await productsServices.updateProduct(
    req.params.id,
    req.body.title
  );
  if (!Product) {
    return res.status(404).json({ errors: ["Product not found"] });
  }

  res.json(Product);
};

const deleteProduct = async (req, res) => {
  const Product = await productsServices.deleteProduct(req.params.id);
  if (!Product) {
    return res.status(404).json({ errors: ["Product not found"] });
  }

  res.send();
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  loginProduct,
};
