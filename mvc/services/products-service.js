const Product = require("../models/products-model");

//SERVICES
//alert change
const createProduct = async (
  title,
  description,
  category,
  color,
  size,
  price,
  img
) => {
  const product = new Product({
    title: title,
    description: description,
    category: category,
    color: color,
    size: size,
    price: price,
    img: img,
  });

  return await product.save();
};

const getProducts = async () => {
  return await Product.find();
};

const getProductById = async (id) => {
  return await Product.findById(id);
};

const getProductByTitle = async (title) => {
  return await Product.findById(title);
};

const getProductsByCategory = async (category) => {
  return await Product.find({ category: category });
};

const NumberOfProductsByCategory = async () => {
  return await Product.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
  ]);
};

//alert change
const updateProduct = async (
  id,
  title,
  description,
  category,
  color,
  size,
  price,
  img
) => {
  const product = await getProductById(id);
  if (!product) return null;

  product.title = title;
  product.description = description;
  product.category = category;
  product.color = color;
  product.size = size;
  product.price = price;
  product.img = img;
  await product.save();
  return product;
};

//alert change
const deleteProduct = async (title) => {
  const Product = await getProductByTitle(title);
  if (!Product) return null;

  await Product.remove();
  return Product;
};

module.exports = {
  createProduct,
  NumberOfProductsByCategory,
  getProductById,
  getProductsByCategory,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductByTitle,
};
