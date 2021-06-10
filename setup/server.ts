import express from "express";

const morgan = require('morgan');
import routes from "../src/index"

const app = express();
const db = require('../config/database');
app.use(express.json());
app.use(morgan('dev'));

db.authenticate()
    .then(async () => {
            console.log('Database connected...');
            return (await routes(app))
        }
    )
    .catch((err: string) => console.log('Error: ' + err))
module.exports = app;
