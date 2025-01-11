const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    spaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Space', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date },
    activityLog: [{ type: Object }],
    progressData: { type: Object },
});

module.exports = mongoose.model('Session', sessionSchema);