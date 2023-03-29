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

const productFilter = async (filter) => {
  var tmp = {};
  if (filter.color != null) {
    tmp["color"] = filter.color;
  }
  tmp["category"] = "";
  if (filter.category != null) {
    tmp["category"] = filter.category;
  }
  var price = 100;
  if (filter.price != null) {
    price = filter.price;
  }
  var sizes = {};
  if (filter.size != null) {
    len = filter.size.length;
    for (let i = 1; i <= len; i++) {
      sizes[i] = filter.size[i - 1];
    }
  }
  return await Product.find({
    $and: [
      { color: tmp["color"] },
      { category: tmp["category"] },
      { price: { $gt: 0, $lt: { price } } },
      { size: { $all: sizes } },
    ],
  });
};

const getProductById = async (id) => {
  return await Product.findById(id);
};

const getProductByTitle = async (title) => {
  return await Product.find({title : title});
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
const updateProduct = async (title,newTitle,description,category,color,size,price,img) => {
  const product = await getProductByTitle(title);
  if (!product) return null;

  product.title = newTitle;
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
  var x = await Product.findOneAndDelete({title: title}).then(product => {
    if(!product)
    {
      return res.status(404).send('Product not found while deleting!');
    }
    console.log("RETURING DELETE: " + product);
    return product;
  }).catch(err => {
    res.status(500).send("ERROR WHILE DELETING: " + err.message);
  });
  console.log("X: " + x);
  return x;
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
  productFilter,
};
