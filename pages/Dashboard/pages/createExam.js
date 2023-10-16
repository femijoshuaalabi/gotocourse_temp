import { Exam } from '../../../models/index.js';
import { sendResponse, responseCode, errorHandler } from '../../../utils/index.js';
import Joi from 'joi';

export default async function (req, res) {
    const data = req.body;
    const user = req.user;
    const { uid } = user;

    const { image, options, question, correctOption } = data;
    const payload = {
        image,
        options,
        question,
        correctOption,
    };
    try {
        // Check the user data entry before processing it
        const schema = Joi.object().keys({
            image: Joi.optional(),
            options: Joi.array().required().error(new Error('Please provide the options')),
            question: Joi.string().required().error(new Error('Please Provide the question')),
            correctOption: Joi.number().required().error(new Error('Please Provide the correct options')),
        });
        // output error if exists
        const { error } = schema.validate(payload);
        if (error) {
            return sendResponse(responseCode.STATUS_FORBIDDEN, { message: error.message }, res);
        }
        payload.creator = uid;
        const exam = await Exam.create(payload);
        return sendResponse(responseCode.STATUS_OK, { message: 'Exam created' }, res);
    } catch (e) {
        return errorHandler(e, res);
    }
}
