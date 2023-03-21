const costumerService = require("../services/costumers");

const createCostumer = async (req, res) => {
  const newCostumer = await costumerService.createCostumer(
    req.body.username,
    req.body.email,
    req.body.password
  );
  res.json(newCostumer);
};

const getCostumers = async (req, res) => {
  const Costumers = await CostumerService.getCostumers();
  res.json(Costumers);
};

const getCostumer = async (req, res) => {
  const Costumer = await CostumerService.getCostumerById(req.params.id);
  if (!Costumer) {
    return res.status(404).json({ errors: ["Costumer not found"] });
  }

  res.json(Costumer);
};

const updateCostumer = async (req, res) => {
  if (!req.body.title) {
    res.status(400).json({
      message: "title is required",
    });
  }

  const Costumer = await CostumerService.updateCostumer(
    req.params.id,
    req.body.title
  );
  if (!Costumer) {
    return res.status(404).json({ errors: ["Costumer not found"] });
  }

  res.json(Costumer);
};

const deleteCostumer = async (req, res) => {
  const Costumer = await CostumerService.deleteCostumer(req.params.id);
  if (!Costumer) {
    return res.status(404).json({ errors: ["Costumer not found"] });
  }

  res.send();
};

module.exports = {
  createCostumer,
  getCostumers,
  getCostumer,
  updateCostumer,
  deleteCostumer,
};
