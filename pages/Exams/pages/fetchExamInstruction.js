import { ExamInstruction } from '../../../models/index.js';
import { sendResponse, responseCode, errorHandler } from '../../../utils/index.js';

export default async function (req, res) {
    try {
        const examInstruction = await ExamInstruction.find().sort({ _id: -1 }).limit(1);
        return sendResponse(responseCode.STATUS_OK, { data: examInstruction }, res);
    } catch (e) {
        return errorHandler(e, res);
    }
}
