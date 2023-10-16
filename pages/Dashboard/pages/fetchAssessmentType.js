import { ExamType } from '../../../models/index.js';
import { sendResponse, responseCode, errorHandler } from '../../../utils/index.js';

export default async function (req, res) {
    try {
        const examType = await ExamType.find();
        const response = [];
        examType.map((type) => {
            response.push({ value: type._id, label: type.type });
        });
        return sendResponse(responseCode.STATUS_OK, { data: response }, res);
    } catch (e) {
        return errorHandler(e, res);
    }
}
