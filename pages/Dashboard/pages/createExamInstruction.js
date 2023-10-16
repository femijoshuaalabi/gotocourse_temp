import { ExamInstruction } from '../../../models/index.js';
import { sendResponse, responseCode, errorHandler } from '../../../utils/index.js';
import Joi from 'joi';

export default async function (req, res) {
    const data = req.body;
    const user = req.user;
    const { uid } = user;
    const {
        examType,
        numberOfQuestions,
        durationInMinutes,
        enrollment,
        multipleAttempts,
        showScore,
        gradeAllocation,
        instructions,
    } = data;
    const payload = {
        examType,
        numberOfQuestions,
        durationInMinutes,
        enrollment,
        multipleAttempts,
        showScore,
        gradeAllocation,
        instructions,
    };
    try {
        // Check the user data entry before processing it
        const schema = Joi.object().keys({
            examType: Joi.string().required().error(new Error('Exam type can not be empty')),
            numberOfQuestions: Joi.string().required().error(new Error('Please provide the number of questions')),
            durationInMinutes: Joi.string().required().error(new Error('Please Provide the duration in minutes')),
            enrollment: Joi.string().required().error(new Error('Enrollment can not be empty')),
            multipleAttempts: Joi.string().required().error(new Error('Please set whether is multiple attempt or not')),
            showScore: Joi.string().required().error(new Error('Please set the score visibility')),
            gradeAllocation: Joi.string().required().error(new Error('Please set the exam type')),
            instructions: Joi.string().required().error(new Error('Please set the exam instructions')),
        });
        // output error if exists
        const { error } = schema.validate(payload);
        if (error) {
            return sendResponse(responseCode.STATUS_FORBIDDEN, { message: error.message }, res);
        }
        payload.creator = uid;
        const instruction = await ExamInstruction.create(payload);
        return sendResponse(responseCode.STATUS_OK, { message: 'instruction created' }, res);
    } catch (e) {
        return errorHandler(e, res);
    }
}
