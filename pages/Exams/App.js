import express from 'express';
import userMiddleware from '../../middleware/userMiddleware.js';
import fetchExamInstruction from './pages/fetchExamInstruction.js';
import fetchExam from './pages/fetchExam.js';

const router = express.Router();
router.use(userMiddleware);
router.get('/fetch-exam-instruction', fetchExamInstruction);
router.get('/fetch-exam', fetchExam);

export default router;
