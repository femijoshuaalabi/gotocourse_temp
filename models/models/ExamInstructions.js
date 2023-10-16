import mongoose from 'mongoose';

const examInstructionSchema = new mongoose.Schema(
    {
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'users',
        },
        examType: {
            type: String,
            required: true,
        },
        numberOfQuestions: {
            type: String,
            required: true,
        },
        durationInMinutes: {
            type: String,
            required: true,
        },
        enrollment: {
            type: String,
            required: true,
        },
        multipleAttempts: {
            type: String,
            required: true,
        },
        showScore: {
            type: String,
            required: true,
        },
        gradeAllocation: {
            type: String,
            required: true,
        },
        instructions: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model('examInstruction', examInstructionSchema);
