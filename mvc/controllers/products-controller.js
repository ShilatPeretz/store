const productsServices = require("../services/products-service");

//check return functions
const createProduct = async (req, res) => {
  console.log(req.body);
  const newProduct = await productsServices.createProduct(
    req.body.title,
    req.body.description,
    req.body.category,
    req.body.color,
    req.body.size,
    req.body.price,
    req.body.img
  );
  res.json(newProduct);
};

const getProducts = async (req, res) => {
  const Products = await productsServices.getProducts();
  res.json(Products);
};

const getProductsByCategory = async (req, res) => {
  const Products = await productsServices.getProductsByCategory(req.category);
  res.json(Products);
};

const NumberOfProductsByCategory = async (req, res) => {
  const NumByCategory = await productsServices.NumberOfProductsByCategory();
  res.json(NumByCategory);
};

const getProductById = async (req, res) => {
  const Product = await productsServices.getProductById(req.params.id);
  if (!Product) {
    return res.status(404).json({ errors: ["Product not found"] });
  }

  res.json(Product);
};

const getProductByTitle = async (req, res) => {
  const Product = await productsServices.getProductByTitle(req.params.title);
  if (!Product) {
    return res.status(404).json({ errors: ["Product not found"] });
  }

  res.json(Product);
};

const updateProduct = async (req, res) => {
  if (!req.body.description) {
    res.status(400).json({
      message: "title is required",
    });
  }
  if (!req.body.description) {
    res.status(400).json({
      message: "description is required",
    });
  }
  if (!req.body.category) {
    res.status(400).json({
      message: "category is required",
    });
  }
  if (!req.body.color) {
    res.status(400).json({
      message: "color is required",
    });
  }
  //array
  if (!req.body.size) {
    res.status(400).json({
      message: "size is required",
    });
  }
  if (!req.body.price) {
    res.status(400).json({
      message: "price is required",
    });
  }

  const Product = await productsServices.updateProduct(
    req.params.id,
    req.body.title,
    req.body.description,
    req.body.category,
    req.body.color,
    req.body.size,
    req.body.price
  );
  if (!Product) {
    return res.status(404).json({ errors: ["Product not found"] });
  }

  res.json(Product);
};

const deleteProduct = async (req, res) => {
  const product = await productsServices.deleteProduct(req.params.title);
  if (!product) {
    return res.status(404).json({ errors: ["Product not found"] });
  }
  res.send();
};

module.exports = {
  createProduct,
  NumberOfProductsByCategory,
  getProducts,
  getProductsByCategory,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductByTitle,
};
