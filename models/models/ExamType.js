import mongoose from 'mongoose';

const examTypeSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model('examType', examTypeSchema);
