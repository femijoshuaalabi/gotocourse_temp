import { responseCode } from '../utils/index.js';
import jwt from 'jsonwebtoken';

export default async function (req, res, next) {
    const unauthorizedAction = (message) => {
        res.status(responseCode.STATUS_UNAUTHORIZED).json({
            response: { message },
            statusCode: responseCode.STATUS_UNAUTHORIZED,
        });
        return;
    };

    let key = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        key = req.headers.authorization.split(' ')[1];
    }

    if (!key || key == '') {
        return unauthorizedAction(
            'Sorry, You are not permitted to view this resources as your encryption failed with gotocourse',
        );
    }
    const token = key.split(':')[1];

    if (!token) {
        return unauthorizedAction('You are not logged in');
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (e) {
        return unauthorizedAction('Session Expired, Please login again');
    }
}
