'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var error_handler_1 = __importDefault(require("../setup/error-handler"));
var q_1 = __importDefault(require("q"));
var Location_route_1 = __importDefault(require("../src/location/Location.route"));
/**
 * The routes will add all the application defined routes
 * @param {express} app The app is an instance of an express application
 * @return {Promise<void>}
 **/
exports.default = (function (app) {
    app.use('/api/v1', Location_route_1.default);
    app.use("*", function (req, res, next) {
        var appError = { status: 404, message: 'Invalid request' };
        return next(appError);
    });
    app.use(error_handler_1.default);
    return q_1.default.resolve(app);
});
