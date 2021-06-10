const config = require('config');
import AppError from "./app-error";
import {Request, Response, NextFunction} from 'express';
import {appErrorResponse} from "./app-error.interface";
// import {config} from "dotenv";


export default (error: any, req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const meta: appErrorResponse = {};
    if (error instanceof AppError) {
        const err = error.format();
        const code = parseInt(err.status_code);
        meta.status_code = code;
        meta.error = {code, message: err.message};
        if (err.messages) {
            meta.messages = err.messages;
        }
        // @ts-ignore
        if (err.type) {
            // @ts-ignore
            meta.error_type = err.type;
        }
    } else {
        let code = 500;
        meta.status_code = code;
        meta.error = {status_code: code, message: 'A problem with our server, currently fixing , please try again'};
        meta.developer_message = error;
    }
    if (error instanceof ReferenceError) {
        const code = 417;
        meta.status_code = code;
        meta.error = {code, message: 'Expectation Failed,Please try again later.'};
        meta.developer_message = error;
    }
    if (error instanceof TypeError) {
        const code = 417;
        meta.status_code = code;
        meta.error = {code, message: 'Type error failed,Please try again later'};
        meta.developer_message = 'Oops! an error occurr';
    }
    if (meta.status_code === 503) {
        let code = 503;
        meta.status_code = code;
        meta.error = {
            status_code: code,
            message: 'A problem with Heroku server, currently fixing , please try again after some time'
        };
        meta.developer_message = 'Oops! an error occurr';
    }
    if (`${config.util.getEnv('NODE_ENV')}` !== 'production') {
        console.log('err >>>>>>>>>:', error);
    }

    return res.status(meta.status_code).json({meta});
};
