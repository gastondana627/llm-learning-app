const mongoose = require('mongoose');

 const activitySchema = new mongoose.Schema({
    activityType: { type: String, required: true },
    content: { type: Object, required: true },
    spaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Space', required: true },
    position: { type: Object},
    creationDate: {type: Date, default: Date.now},
 });

 module.exports = mongoose.model('Activity', activitySchema);