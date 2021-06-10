import * as express from 'express'
import {locationValidator} from "./Location.validator"
import _ from "underscore";

const db = require("../../config/database");
import {Request, Response, NextFunction} from 'express';
import {BAD_REQUEST, CREATED, NOT_FOUND, OK} from "../../util/status-codes";
// @ts-ignore
import {apiResponseFormatter, DistanceCalulator} from "../../util/helper"
import LocationModel from "./Location.model";


/**
 * @param{Object} req this hold the request parameter of the end point
 * @param{Object} res this holds the response parameter of the endpoint
 * @param next
 * */
exports.GetAllLocation = async (req: Request, res: Response, next: NextFunction): Promise<object> => {
    try {
        const findLocations = await LocationModel.findAll();
        if (!findLocations) {
            return res.status(BAD_REQUEST).json(apiResponseFormatter(false, BAD_REQUEST, 'Oops! na error occur'))
        } else if (findLocations.length === 0) {
            return res.status(OK).json(apiResponseFormatter(true, OK, "0 locations created at the moment"))
        }
        return res.status(OK)
            .json(apiResponseFormatter(true, OK, "Success", findLocations));
    } catch (e) {
        // @ts-ignore
        return next(e);
    }

};

exports.createLocation = async (req: Request, res: Response, next: NextFunction): Promise<object | void> => {
    try {
        let obj = _.pick(req.body, ['location_name', 'description', 'website', 'phone', 'location_lat', 'location_log']);
        const validateLocationInput = await locationValidator.validateCreate(obj);
        if (!validateLocationInput.passed) {
            return res.status(BAD_REQUEST)
                .json({
                    status: false,
                    code: 400,
                    message: "There's error in your inputs",
                    errors: validateLocationInput.errors,
                })
        }
        const createLocation = await LocationModel.create(obj);
        if (!createLocation) {
            return res.status(BAD_REQUEST)
                .json(apiResponseFormatter(false, BAD_REQUEST, 'Oops! an error occurr'))
        }
        if (createLocation) {
            return res.status(CREATED)
                .json(apiResponseFormatter(true, OK, 'SUCCESS', createLocation))
        }
        return res.status(BAD_REQUEST)
            .json(apiResponseFormatter(false, BAD_REQUEST, 'oops! an errror occurr'))
    } catch (e) {
        return next(e);
    }
};

exports.findOneLocation = async (req: Request, res: Response, next: NextFunction): Promise<object | void> => {
    try {
        if (req.query.locationId) {
            const getOneLocation = await LocationModel.findByPk(req.query.locationId)
            if (!getOneLocation) {
                return res.status(BAD_REQUEST)
                    .json(apiResponseFormatter(false, BAD_REQUEST, 'Oops! an error occurr'))
            }
            if (getOneLocation) {
                return res.status(CREATED)
                    .json(apiResponseFormatter(true, OK, 'SUCCESS', getOneLocation))
            }
            return res.status(BAD_REQUEST)
                .json(apiResponseFormatter(false, BAD_REQUEST, 'Requested Location not found'))
        } else {
            return res.status(BAD_REQUEST)
                .json(apiResponseFormatter(false, BAD_REQUEST, 'Oops! please provide location details'))
        }
    } catch (e) {
        return next(e);
    }
};


exports.updateLocation = async (req: Request, res: Response, next: NextFunction): Promise<object | void> => {
    try {
        if (req.query.locationId) {
            let obj = _.pick(req.body, ['location_name', 'description', 'website', 'phone', 'contact', 'location_lat', 'location_log']);
            const getOneLocation = await LocationModel.findByPk(
                req.query.locationId
            );
            if (getOneLocation) {
                const findLocationAndUpdate = await LocationModel.update(obj, {where: {id: req.query.locationId}});
                if (!findLocationAndUpdate) {
                    return res.status(BAD_REQUEST)
                        .json(apiResponseFormatter(false, BAD_REQUEST, 'Oops! an error occurr'))
                }
                if (findLocationAndUpdate) {
                    return res.status(OK)
                        .json(apiResponseFormatter(true, OK, 'SUCCESS',))
                }
                return res.status(BAD_REQUEST)
                    .json(apiResponseFormatter(false, BAD_REQUEST, 'oops! an errror occurr'))
            } else {
                return res.status(BAD_REQUEST)
                    .json(apiResponseFormatter(false, BAD_REQUEST, 'Oops! please provide location details'))
            }
        }
        return res.status(NOT_FOUND).json(apiResponseFormatter(false, BAD_REQUEST, "Provided location details not found"))
    } catch (e) {
        return next(e);
    }
};
exports.deleteLocation = async (req: Request, res: Response, next: NextFunction): Promise<object | void> => {
    try {
        if (req.query.locationId) {
            const getOneLocation = await LocationModel.findByPk(req.query.locationId
            );
            if (getOneLocation) {
                const deleteLocation = await LocationModel.destroy({where: {id: req.query.locationId}})
                if (!deleteLocation) {
                    return res.status(BAD_REQUEST)
                        .json(apiResponseFormatter(false, BAD_REQUEST, 'Oops! an error occurr'))
                }
                if (deleteLocation) {
                    return res.status(OK)
                        .json(apiResponseFormatter(true, OK, 'SUCCESS',))
                }
                return res.status(BAD_REQUEST)
                    .json(apiResponseFormatter(false, BAD_REQUEST, 'oops! an errror occurr'))

            }
            return res.status(NOT_FOUND).json(apiResponseFormatter(false, BAD_REQUEST, "Provided location details not found"))
        } else {
            return res.status(BAD_REQUEST)
                .json(apiResponseFormatter(false, BAD_REQUEST, 'Oops! please provide location details'))
        }

    } catch (e) {
        return next(e);
    }
};

exports.distanceCalulator = async (req: Request, res: Response, next: NextFunction): Promise<object | void> => {

    try {
        const findUserLocation = await LocationModel.findByPk(req.body.locationId);
        if (findUserLocation) {
            if (findUserLocation.location_lat && findUserLocation.location_log !== null) {
                const result = DistanceCalulator(findUserLocation.location_lat, findUserLocation.location_log, req.body.adminlat, req.body.adminlog);
                return res.status(OK)
                // @ts-ignore
                    .json(apiResponseFormatter(true, OK, 'Success', result))
            }
            return res.status(BAD_REQUEST)
                .json(apiResponseFormatter(false, BAD_REQUEST, "Selected location coordinate is null"))
        }
        return res.status(NOT_FOUND).json(apiResponseFormatter(false, BAD_REQUEST, "Oops! invalid location"))
    } catch (e) {
        return next(e);
    }

};

