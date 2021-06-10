const Location_Sequelize = require("Sequelize");
const database = require('../../config/database');

const LocationModel = database.define("locations", {
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

export default LocationModel
