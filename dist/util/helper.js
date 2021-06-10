"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistanceCalulator = exports.apiResponseFormatter = void 0;
function apiResponseFormatter(success, code, message, data, server_err) {
    if (data === void 0) { data = undefined; }
    if (server_err === void 0) { server_err = undefined; }
    switch (success) {
        case true: {
            return {
                success: success,
                code: code,
                message: message,
                data: data
            };
        }
        case false: {
            return {
                success: success,
                code: code,
                message: message,
                server_error: server_err
            };
        }
    }
}
exports.apiResponseFormatter = apiResponseFormatter;
function validateRadius(unit) {
    var r = { 'M': 6371009, 'KM': 6371.009, 'MI': 3958.761, 'NM': 3440.070, 'YD': 6967420, 'FT': 20902260 };
    if (unit in r) { // @ts-ignore
        return r[unit];
    }
    else
        return unit;
}
function DistanceCalulator(userlat, userlog, adminlat, adminlon, unit) {
    if (unit === undefined)
        unit = 'KM';
    var r = validateRadius(unit);
    userlat *= Math.PI / 180;
    userlog *= Math.PI / 180;
    adminlat *= Math.PI / 180;
    adminlon *= Math.PI / 180;
    var lonDelta = adminlon - userlog;
    var a = Math.pow(Math.cos(adminlat) * Math.sin(lonDelta), 2) + Math.pow(Math.cos(userlat) * Math.sin(adminlat) - Math.sin(userlat) * Math.cos(adminlat) * Math.cos(lonDelta), 2);
    var b = Math.sin(userlat) * Math.sin(adminlat) + Math.cos(userlat) * Math.cos(adminlat) * Math.cos(lonDelta);
    var angle = Math.atan2(Math.sqrt(a), b);
    return angle * r;
}
exports.DistanceCalulator = DistanceCalulator;
