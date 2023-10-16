import mongoose from 'mongoose';

const systemConfigurationSchema = new mongoose.Schema(
    {
        systemKey: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model('systemConfiguration', systemConfigurationSchema);
