const { Router } = require("express");
const locationRouter = Router();
const locationController = require("../controllers/location-controller");
const statusMSG = require('../../public/json/status-messages.json');

locationRouter.get("/getlocations", locationController.getLocations);

locationRouter.post("/createlocation",function(req, res, next){
    if(req.session && req.session.isAdmin)
    {
        next();
    }
    else
    {
        res.render(__dirname + "/../views/error/error",{status: 403, msg: statusMSG[403]});
    }
}, locationController.createLocation);

module.exports = locationRouter;
