import { Exam, ExamInstruction } from '../../../models/index.js';
import { sendResponse, responseCode, errorHandler } from '../../../utils/index.js';

export default async function (req, res) {
    try {
        const exam = await Exam.find().sort([['createdAt', 'descending']]);
        const examInstruction = await ExamInstruction.find().sort({ _id: -1 }).limit(1);
        const response = [];
        await Promise.all(
            exam.map((ex) => {
                response.push({
                    id: ex._id,
                    image: ex.image,
                    question: ex.question,
                    options: ex.options,
                    duration: examInstruction[0].durationInMinutes,
                    currentTime: new Date(),
                });
            }),
        );
        return sendResponse(responseCode.STATUS_OK, { data: response }, res);
    } catch (e) {
        console.log(e);
        return errorHandler(e, res);
    }
}
