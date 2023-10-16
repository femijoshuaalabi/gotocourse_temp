import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            maxlength: [20, 'must be less than or equal to 20'],
            minlength: [2, 'must be greater than 2'],
        },
        lastName: {
            type: String,
            trim: true,
            maxlength: [20, 'must be less than or equal to 20'],
            minlength: [2, 'must be greater than 2'],
        },
        email: {
            type: String,
            required: [true, 'Please provide your email'],
            unique: true,
            trim: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email'],
        },
        password: {
            type: String,
            minlength: 5,
            // select: false,
        },
        role: {
            type: String,
            enum: ['teacher', 'student'],
            default: 'teacher',
        },
    },
    { timestamps: true },
);

const User = mongoose.model('User', userSchema);
export default User;
