const Product = require("../models/products-model");

//SERVICES
//alert change
const createProduct = async (
  description,
  category,
  color,
  size,
  price,
  img,
  stock
) => {
  const product = new Product({
    description: description,
    category: category,
    color: color,
    size: size,
    price: price,
    img: img,
    stock: stock,
  });

  return await product.save();
};

const getProducts = async () => {
  return await Product.find();
};

const getProductById = async (id) => {
  return await Product.findById(id);
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
  description,
  category,
  color,
  size,
  price,
  img,
  stock
) => {
  const product = await getProductById(id);
  if (!product) return null;

  product.description = description;
  product.category = category;
  product.color = color;
  product.size = size;
  product.price = price;
  product.img = img;
  product.stock = stock;
  await product.save();
  return product;
};

const updateProductStock = async (id, num) => {
  const product = await getProductById(id);
  if (!product) return null;

  product.stock = product.stock - num;
  await product.save();
  return product;
};

//alert change
const deleteProduct = async (id) => {
  const Product = await getProductById(id);
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
  updateProductStock,
  deleteProduct,
};
