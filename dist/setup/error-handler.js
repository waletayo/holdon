"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config = require('config');
var app_error_1 = __importDefault(require("./app-error"));
// import {config} from "dotenv";
exports.default = (function (error, req, res, next) {
    // @ts-ignore
    var meta = {};
    if (error instanceof app_error_1.default) {
        var err = error.format();
        var code = parseInt(err.status_code);
        meta.status_code = code;
        meta.error = { code: code, message: err.message };
        if (err.messages) {
            meta.messages = err.messages;
        }
        // @ts-ignore
        if (err.type) {
            // @ts-ignore
            meta.error_type = err.type;
        }
    }
    else {
        var code = 500;
        meta.status_code = code;
        meta.error = { status_code: code, message: 'A problem with our server, currently fixing , please try again' };
        meta.developer_message = error;
    }
    if (error instanceof ReferenceError) {
        var code = 417;
        meta.status_code = code;
        meta.error = { code: code, message: 'Expectation Failed,Please try again later.' };
        meta.developer_message = error;
    }
    if (error instanceof TypeError) {
        var code = 417;
        meta.status_code = code;
        meta.error = { code: code, message: 'Type error failed,Please try again later' };
        meta.developer_message = 'Oops! an error occurr';
    }
    if (meta.status_code === 503) {
        var code = 503;
        meta.status_code = code;
        meta.error = {
            status_code: code,
            message: 'A problem with Heroku server, currently fixing , please try again after some time'
        };
        meta.developer_message = 'Oops! an error occurr';
    }
    if ("" + config.util.getEnv('NODE_ENV') !== 'production') {
        console.log('err >>>>>>>>>:', error);
    }
    return res.status(meta.status_code).json({ meta: meta });
});
