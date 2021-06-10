"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Location_Sequelize = require("Sequelize");
var database = require('../../config/database');
var LocationModel = database.define("locations", {
    location_name: {
        type: Location_Sequelize.STRING
    },
    description: {
        type: Location_Sequelize.STRING
    },
    website: {
        type: Location_Sequelize.STRING
    },
    phone: {
        type: Location_Sequelize.STRING
    },
    location_lat: {
        type: Location_Sequelize.STRING
    },
    location_log: {
        type: Location_Sequelize.STRING
    }
});
exports.default = LocationModel;
