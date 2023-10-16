import { User } from '../../models/index.js';
import { sendResponse, responseCode, errorHandler } from '../../utils/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function (req, res) {
    const data = req.body;
    const { email, password } = data;

    if (typeof password === 'undefined' || password === '') {
        return sendResponse(responseCode.STATUS_FORBIDDEN, { message: 'Password is Empty' }, res);
    }

    if (typeof email === 'undefined' || email === '') {
        return sendResponse(responseCode.STATUS_FORBIDDEN, { message: 'Please Provide your email' }, res);
    }

    try {
        const user = await User.findOne({ email });
        if (user === null) {
            return sendResponse(
                responseCode.STATUS_FORBIDDEN,
                {
                    message: `Failed to login, possible reasons: Email or Password not correct or account doesn't not exist`,
                },
                res,
            );
        } else {
            const verify = bcrypt.compareSync(password, user.password);
            if (verify) {
                const payload = {
                    uid: user._id,
                    email: user.email,
                    role: user.role,
                };
                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                    algorithm: process.env.JWT_ENGINE,
                });
                return sendResponse(responseCode.STATUS_OK, { token, role: user.role }, res);
            } else {
                return sendResponse(responseCode.STATUS_FORBIDDEN, { message: 'Password incorrect' }, res);
            }
        }
    } catch (e) {
        return errorHandler(e, res);
    }
}
