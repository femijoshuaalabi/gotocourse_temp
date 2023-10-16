import { Exam } from '../../../models/index.js';
import { sendResponse, responseCode, errorHandler } from '../../../utils/index.js';

export default async function (req, res) {
    try {
        const exam = await Exam.find().sort([['createdAt', 'descending']]);
        const response = [];
        exam.map((ex) => {
            response.push({
                image: ex.image,
                question: ex.question,
                options: ex.options,
            });
        });
        return sendResponse(responseCode.STATUS_OK, { data: response }, res);
    } catch (e) {
        return errorHandler(e, res);
    }
}
