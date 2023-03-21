const Costumer = require("../models/costumers");

//SERVICES
const createCostumer = async (username, email, password) => {
  const user = new Costumer({
    username: username,
    email: email,
    password: password,
  });

  return await user.save();
};

const getCostumers = async () => {
  return await Costumer.find({});
};

const getCostumerById = async (id) => {
  return await Costumer.findById(id);
};

const updateCostumer = async (id, username, email, password) => {
  const costumer = await getCostumerById(id);
  if (!costumer) return null;

  costumer.username = username;
  costumer.email = email;
  costumer.password = password;
  await costumer.save();
  return costumer;
};

const deleteCostumer = async (id) => {
  const costumer = await getCostumerById(id);
  if (!costumer) return null;

  await costumer.remove();
  return costumer;
};

module.exports = {
  createCostumer,
  getCostumerById,
  getCostumers,
  updateCostumer,
  deleteCostumer,
};
