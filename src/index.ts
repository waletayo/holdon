'use strict';
import errorHandler from "../setup/error-handler";
import Q from 'q';
import {Request, Response, NextFunction} from 'express';
import LocationRoutes from "../src/location/Location.route";


/**
 * The routes will add all the application defined routes
 * @param {express} app The app is an instance of an express application
 * @return {Promise<void>}
 **/

export default (app: any) => {
    app.use('/api/v1', LocationRoutes);
    app.use("*", (req: Request, res: Response, next: NextFunction) => {
        const appError = {status: 404, message: 'Invalid request'};
        return next(appError);
    });
    app.use(errorHandler);

    return Q.resolve(app);
}


