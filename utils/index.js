import { fileURLToPath } from 'url';
import { dirname } from 'path';

export function fileDirName() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    return { __dirname, __filename };
}

export function sendResponse(status_code, response, res) {
    return res.status(status_code).json({
        response: response,
        statusCode: status_code,
    });
}

export const responseCode = {
    STATUS_OK: 200,
    STATUS_CREATED: 201,
    STATUS_ACCEPTED: 202,
    STATUS_BAD_REQUEST: 400,
    STATUS_UNAUTHORIZED: 401,
    STATUS_PAYMENT_REQUIRED: 402,
    STATUS_FORBIDDEN: 403,
    STATUS_NOT_FOUND: 404,
    STATUS_METHOD_NOT_ALLOW: 405,
    STATUS_NOT_ACCEPTABLE: 406,
    STATUS_SERVER_ERROR: 500,
};

export const errorHandler = (e, res) => {
    if (e instanceof Error.ValidationError) {
        const errObject = {};
        Object.values(e.errors).map((err) => {
            errObject[err.path] = err.message;
        });
        return res.status(responseCode.STATUS_FORBIDDEN).json({
            response: errObject,
            statusCode: responseCode.STATUS_FORBIDDEN,
        });
    } else {
        if (e.response) {
            const response = e.response;
            const { ...errorObject } = response;
            return res.status(responseCode.STATUS_FORBIDDEN).json({
                response: errorObject.data,
                statusCode: responseCode.STATUS_FORBIDDEN,
            });
        } else {
            console.log(e);
            if (e instanceof Error.CastError) {
                return res.status(responseCode.STATUS_FORBIDDEN).json({
                    response: e.reason ? e.reason.message : 'Untraceable error occurred',
                    statusCode: responseCode.STATUS_FORBIDDEN,
                });
            } else {
                // An unknown error has error, this error can be related to server issues
                return res.status(responseCode.STATUS_SERVER_ERROR).json({
                    message: 'Something went wrong',
                    response: e.message,
                    statusCode: responseCode.STATUS_SERVER_ERROR,
                });
            }
        }
    }
};

export function makeId(length) {
    let result = '';
    const characters = 'abcdefghijklmnpqrstuvwxyz123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
