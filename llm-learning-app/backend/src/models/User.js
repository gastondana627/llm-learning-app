const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['teacher', 'student'], required: true },
    profileImageURL: {type: String, default: null},
    spaces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Space' }],
});

module.exports = mongoose.model('User', userSchema);