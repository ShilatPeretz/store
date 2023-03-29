const productsServices = require("../services/products-service");

//check return functions
const createProduct = async (req, res) => {
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
  return Products;
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
  try {
    const Product = await productsServices.getProductById(req.params.id);
    if (!Product) {
      return res.status(404).json({ errors: ["Product not found"] });
    }

    res.json(Product);
  } catch (err) {
    return res.status(404).json({ errors: ["Please enter a valid ID!"] });
  }
};

const getProductByTitle = async (req, res) => {
  const Product = await productsServices.getProductByTitle(req.params.title);
  if (!Product) {
    return res.status(404).json({ errors: ["Product not found"] });
  }

  res.json(Product);
};
const myJson = require("../../public/colors.json");
const productFilter = async (req, res) => {
  let colorQuery = req.query.colors;
  if (req.query.colors !== undefined) {
    colorQuery = { $in: req.query.colors };
  } else {
    let allColors = [];
    for (let i = 0; i < myJson.length; i++) {
      allColors.push(myJson[i].toLowerCase());
    }
    //console.log("ALLCOLORS: " + allColors);
    colorQuery = { $in: allColors };
  }
  const Products = await productsServices.productFilter(
    req.query.maxPrice,
    colorQuery
  );
  if (!Products) {
    return res.json({ massage: ["Products not found"] });
  }
  res.json(Products);
};

const updateProduct = async (req, res) => {
  const Product = await productsServices.updateProduct(
    req.params.title,
    req.body.newTitle,
    req.body.description,
    req.body.category,
    req.body.color,
    req.body.size,
    req.body.price
  );
  if (!Product) {
    return res
      .status(404)
      .json({ errors: ["Product not found while editing"] });
  }

  res.json(Product);
};

const deleteProduct = async (req, res) => {
  console.log("GOT AS PARAM: " + req.params.title);
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
  productFilter,
};
