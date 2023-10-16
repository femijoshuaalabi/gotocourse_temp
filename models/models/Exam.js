import mongoose from 'mongoose';

const examSchema = new mongoose.Schema(
    {
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'users',
        },
        image: {
            type: String,
        },
        question: {
            type: String,
        },
        options: [
            {
                option: {
                    type: String,
                },
            },
        ],
        correctOption: {
            type: String,
        },
    },
    { timestamps: true },
);

export default mongoose.model('exam', examSchema);
