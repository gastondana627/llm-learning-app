 const mongoose = require('mongoose');

const metricSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    metricType: { type: String, required: true },
    metricValue: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    spaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Space' }
});

module.exports = mongoose.model('Metric', metricSchema);