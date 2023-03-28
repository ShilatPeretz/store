const { Router } = require("express");
const locationRouter = Router();
const locationController = require("../controllers/location-controller");

locationRouter.get("/getlocations", locationController.getLocations);

locationRouter.post("/createlocation", locationController.createLocation);

module.exports = locationRouter;