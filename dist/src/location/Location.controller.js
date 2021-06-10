"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Location_validator_1 = require("./Location.validator");
var underscore_1 = __importDefault(require("underscore"));
var db = require("../../config/database");
var status_codes_1 = require("../../util/status-codes");
// @ts-ignore
var helper_1 = require("../../util/helper");
var Location_model_1 = __importDefault(require("./Location.model"));
/**
 * @param{Object} req this hold the request parameter of the end point
 * @param{Object} res this holds the response parameter of the endpoint
 * @param next
 * */
exports.GetAllLocation = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var findLocations, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Location_model_1.default.findAll()];
            case 1:
                findLocations = _a.sent();
                if (!findLocations) {
                    return [2 /*return*/, res.status(status_codes_1.BAD_REQUEST).json(helper_1.apiResponseFormatter(false, status_codes_1.BAD_REQUEST, 'Oops! na error occur'))];
                }
                else if (findLocations.length === 0) {
                    return [2 /*return*/, res.status(status_codes_1.OK).json(helper_1.apiResponseFormatter(true, status_codes_1.OK, "0 locations created at the moment"))];
                }
                return [2 /*return*/, res.status(status_codes_1.OK)
                        .json(helper_1.apiResponseFormatter(true, status_codes_1.OK, "Success", findLocations))];
            case 2:
                e_1 = _a.sent();
                // @ts-ignore
                return [2 /*return*/, next(e_1)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createLocation = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var obj, validateLocationInput, createLocation, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                obj = underscore_1.default.pick(req.body, ['location_name', 'description', 'website', 'phone', 'location_lat', 'location_log']);
                return [4 /*yield*/, Location_validator_1.locationValidator.validateCreate(obj)];
            case 1:
                validateLocationInput = _a.sent();
                if (!validateLocationInput.passed) {
                    return [2 /*return*/, res.status(status_codes_1.BAD_REQUEST)
                            .json({
                            status: false,
                            code: 400,
                            message: "There's error in your inputs",
                            errors: validateLocationInput.errors,
                        })];
                }
                return [4 /*yield*/, Location_model_1.default.create(obj)];
            case 2:
                createLocation = _a.sent();
                if (!createLocation) {
                    return [2 /*return*/, res.status(status_codes_1.BAD_REQUEST)
                            .json(helper_1.apiResponseFormatter(false, status_codes_1.BAD_REQUEST, 'Oops! an error occurr'))];
                }
                if (createLocation) {
                    return [2 /*return*/, res.status(status_codes_1.CREATED)
                            .json(helper_1.apiResponseFormatter(true, status_codes_1.OK, 'SUCCESS', createLocation))];
                }
                return [2 /*return*/, res.status(status_codes_1.BAD_REQUEST)
                        .json(helper_1.apiResponseFormatter(false, status_codes_1.BAD_REQUEST, 'oops! an errror occurr'))];
            case 3:
                e_2 = _a.sent();
                return [2 /*return*/, next(e_2)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.findOneLocation = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var getOneLocation, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!req.query.locationId) return [3 /*break*/, 2];
                return [4 /*yield*/, Location_model_1.default.findByPk(req.query.locationId)];
            case 1:
                getOneLocation = _a.sent();
                if (!getOneLocation) {
                    return [2 /*return*/, res.status(status_codes_1.BAD_REQUEST)
                            .json(helper_1.apiResponseFormatter(false, status_codes_1.BAD_REQUEST, 'Oops! an error occurr'))];
                }
                if (getOneLocation) {
                    return [2 /*return*/, res.status(status_codes_1.CREATED)
                            .json(helper_1.apiResponseFormatter(true, status_codes_1.OK, 'SUCCESS', getOneLocation))];
                }
                return [2 /*return*/, res.status(status_codes_1.BAD_REQUEST)
                        .json(helper_1.apiResponseFormatter(false, status_codes_1.BAD_REQUEST, 'Requested Location not found'))];
            case 2: return [2 /*return*/, res.status(status_codes_1.BAD_REQUEST)
                    .json(helper_1.apiResponseFormatter(false, status_codes_1.BAD_REQUEST, 'Oops! please provide location details'))];
            case 3: return [3 /*break*/, 5];
            case 4:
                e_3 = _a.sent();
                return [2 /*return*/, next(e_3)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateLocation = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var obj, getOneLocation, findLocationAndUpdate, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                if (!req.query.locationId) return [3 /*break*/, 4];
                obj = underscore_1.default.pick(req.body, ['location_name', 'description', 'website', 'phone', 'contact', 'location_lat', 'location_log']);
                return [4 /*yield*/, Location_model_1.default.findByPk(req.query.locationId)];
            case 1:
                getOneLocation = _a.sent();
                if (!getOneLocation) return [3 /*break*/, 3];
                return [4 /*yield*/, Location_model_1.default.update(obj, { where: { id: req.query.locationId } })];
            case 2:
                findLocationAndUpdate = _a.sent();
                if (!findLocationAndUpdate) {
                    return [2 /*return*/, res.status(status_codes_1.BAD_REQUEST)
                            .json(helper_1.apiResponseFormatter(false, status_codes_1.BAD_REQUEST, 'Oops! an error occurr'))];
                }
                if (findLocationAndUpdate) {
                    return [2 /*return*/, res.status(status_codes_1.OK)
                            .json(helper_1.apiResponseFormatter(true, status_codes_1.OK, 'SUCCESS'))];
                }
                return [2 /*return*/, res.status(status_codes_1.BAD_REQUEST)
                        .json(helper_1.apiResponseFormatter(false, status_codes_1.BAD_REQUEST, 'oops! an errror occurr'))];
            case 3: return [2 /*return*/, res.status(status_codes_1.BAD_REQUEST)
                    .json(helper_1.apiResponseFormatter(false, status_codes_1.BAD_REQUEST, 'Oops! please provide location details'))];
            case 4: return [2 /*return*/, res.status(status_codes_1.NOT_FOUND).json(helper_1.apiResponseFormatter(false, status_codes_1.BAD_REQUEST, "Provided location details not found"))];
            case 5:
                e_4 = _a.sent();
                return [2 /*return*/, next(e_4)];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteLocation = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var getOneLocation, deleteLocation, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                if (!req.query.locationId) return [3 /*break*/, 4];
                return [4 /*yield*/, Location_model_1.default.findByPk(req.query.locationId)];
            case 1:
                getOneLocation = _a.sent();
                if (!getOneLocation) return [3 /*break*/, 3];
                return [4 /*yield*/, Location_model_1.default.destroy({ where: { id: req.query.locationId } })];
            case 2:
                deleteLocation = _a.sent();
                if (!deleteLocation) {
                    return [2 /*return*/, res.status(status_codes_1.BAD_REQUEST)
                            .json(helper_1.apiResponseFormatter(false, status_codes_1.BAD_REQUEST, 'Oops! an error occurr'))];
                }
                if (deleteLocation) {
                    return [2 /*return*/, res.status(status_codes_1.OK)
                            .json(helper_1.apiResponseFormatter(true, status_codes_1.OK, 'SUCCESS'))];
                }
                return [2 /*return*/, res.status(status_codes_1.BAD_REQUEST)
                        .json(helper_1.apiResponseFormatter(false, status_codes_1.BAD_REQUEST, 'oops! an errror occurr'))];
            case 3: return [2 /*return*/, res.status(status_codes_1.NOT_FOUND).json(helper_1.apiResponseFormatter(false, status_codes_1.BAD_REQUEST, "Provided location details not found"))];
            case 4: return [2 /*return*/, res.status(status_codes_1.BAD_REQUEST)
                    .json(helper_1.apiResponseFormatter(false, status_codes_1.BAD_REQUEST, 'Oops! please provide location details'))];
            case 5: return [3 /*break*/, 7];
            case 6:
                e_5 = _a.sent();
                return [2 /*return*/, next(e_5)];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.distanceCalulator = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var findUserLocation, result, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Location_model_1.default.findByPk(req.body.locationId)];
            case 1:
                findUserLocation = _a.sent();
                if (findUserLocation) {
                    if (findUserLocation.location_lat && findUserLocation.location_log !== null) {
                        result = helper_1.DistanceCalulator(findUserLocation.location_lat, findUserLocation.location_log, req.body.adminlat, req.body.adminlog);
                        return [2 /*return*/, res.status(status_codes_1.OK)
                                // @ts-ignore
                                .json(helper_1.apiResponseFormatter(true, status_codes_1.OK, 'Success', result))];
                    }
                    return [2 /*return*/, res.status(status_codes_1.BAD_REQUEST)
                            .json(helper_1.apiResponseFormatter(false, status_codes_1.BAD_REQUEST, "Selected location coordinate is null"))];
                }
                return [2 /*return*/, res.status(status_codes_1.NOT_FOUND).json(helper_1.apiResponseFormatter(false, status_codes_1.BAD_REQUEST, "Oops! invalid location"))];
            case 2:
                e_6 = _a.sent();
                return [2 /*return*/, next(e_6)];
            case 3: return [2 /*return*/];
        }
    });
}); };
