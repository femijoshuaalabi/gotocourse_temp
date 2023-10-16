import { responseCode } from '../utils/index.js';
import { systemConfiguration } from '../models/index.js';

export default async function (req, res, next) {
    const unauthorizedAction = (message) => {
        res.status(responseCode.STATUS_UNAUTHORIZED).json({
            response: { message },
            statusCode: responseCode.STATUS_UNAUTHORIZED,
        });
        return;
    };

    let key;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        key = req.headers.authorization.split(' ')[1];
    }

    if (!key) {
        return unauthorizedAction(
            'Sorry, You are not permitted to view this resources as your encryption failed with gotocourse',
        );
    }

    const systemKey = key.split(':')[0];

    if (!systemKey) {
        return unauthorizedAction(
            'Sorry, You are not permitted to view this resources as your encryption failed with gotocourse',
        );
    }

    const configuration = await systemConfiguration.findOne({ systemKey });

    if (configuration === null) {
        return unauthorizedAction(
            'Sorry, You are not permitted to view this resources as you have passed a wrong access encryption key',
        );
    } else {
        next();
    }
}
