const express = require("express");

const router = express.Router();
const LocationController = require("./Location.controller");
router.get("/user/users", LocationController.GetAllLocation);
router.post("/location/create", LocationController.createLocation);
router.get("/location/one", LocationController.findOneLocation);
router.patch("/location/one/edit", LocationController.updateLocation);
router.delete("/location/one/remove", LocationController.deleteLocation);
router.get("/location/calculate", LocationController.distanceCalulator);

export default router;
