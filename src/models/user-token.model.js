import mongoose from '../config/mongoose.config';

const userTokenSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    expires: {
        type: mongoose.Schema.Types.Mixed
    }
});

export const UserToken = mongoose.model('UserToken', userTokenSchema);