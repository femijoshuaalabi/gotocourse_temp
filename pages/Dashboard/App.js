import express from 'express';
import userMiddleware from '../../middleware/userMiddleware.js';
import fetchAssessmentType from './pages/fetchAssessmentType.js';
import createExamInstruction from './pages/createExamInstruction.js';
import uploadImage from './pages/uploadImage.js';
import createExam from './pages/createExam.js';
import fetchQuestions from './pages/fetchQuestions.js';

const router = express.Router();
router.use(userMiddleware);
router.get('/fetch-assessment-type', fetchAssessmentType);
router.post('/create-exam-instruction', createExamInstruction);
router.post('/upload-image', uploadImage);
router.post('/create-exam', createExam);
router.get('/fetch-questions', fetchQuestions);

export default router;
