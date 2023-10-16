import { sendResponse, responseCode, errorHandler } from '../../../utils/index.js';
import cloudinary from 'cloudinary';
import fs from 'fs';

const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if (err) throw err;
    });
};

export default async function (req, res) {
    // check if file exists in payload
    if (!req.files || Object.keys(req.files).length === 0) {
        return sendResponse(responseCode.STATUS_FORBIDDEN, { message: 'No files were uploaded' }, res);
    }

    try {
        const file = req.files.file;
        const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
            folder: 'gotocourse',
        });
        // remove file from temp folder
        removeTmp(file.tempFilePath);
        // create a payload
        const payload = {
            public_id: result.public_id,
            url: result.secure_url,
        };
        return sendResponse(responseCode.STATUS_OK, { data: payload }, res);
    } catch (e) {
        console.log(e);
        return errorHandler(e, res);
    }
}
