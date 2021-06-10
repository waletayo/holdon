export function apiResponseFormatter(success: boolean, code: number, message: string, data = undefined, server_err = undefined) {
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

function validateRadius(unit: any) {
    let r = {'M': 6371009, 'KM': 6371.009, 'MI': 3958.761, 'NM': 3440.070, 'YD': 6967420, 'FT': 20902260};
    if (unit in r) { // @ts-ignore
        return r[unit];
    }
    else return unit;
}


export function DistanceCalulator(userlat: any, userlog: any, adminlat: any, adminlon: any, unit?: any) {
    if (unit === undefined) unit = 'KM';
    let r = validateRadius(unit);
    userlat *= Math.PI / 180;
    userlog *= Math.PI / 180;
    adminlat *= Math.PI / 180;
    adminlon *= Math.PI / 180;
    let lonDelta = adminlon - userlog;
    let a = Math.pow(Math.cos(adminlat) * Math.sin(lonDelta), 2) + Math.pow(Math.cos(userlat) * Math.sin(adminlat) - Math.sin(userlat) * Math.cos(adminlat) * Math.cos(lonDelta), 2);
    let b = Math.sin(userlat) * Math.sin(adminlat) + Math.cos(userlat) * Math.cos(adminlat) * Math.cos(lonDelta);
    let angle = Math.atan2(Math.sqrt(a), b);

    return angle * r;
}
