'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationValidator = void 0;
var validatorjs_1 = __importDefault(require("validatorjs"));
exports.locationValidator = {
    /**
     *@function
     * @param {Object} obj The validation object
     * @return {Object}
     * */
    validateCreate: function (obj) {
        var rules = {
            location_name: 'required|string',
            description: 'required|string',
            website: 'required|string',
            phone: 'required|string|max:11',
            location_lat: 'required|string',
            location_log: 'required|string',
        };
        var validator = new validatorjs_1.default(obj, rules);
        return {
            errors: validator.errors.all(),
            passed: validator.passes(),
        };
    },
};
