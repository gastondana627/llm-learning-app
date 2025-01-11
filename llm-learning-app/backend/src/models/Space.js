const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
    spaceName: { type: String, required: true },
    description: { type: String, required: true },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    canvasJSON: { type: String, default: "{}"},
    creationDate: {type: Date, default: Date.now},
    settings: {type: Object, default: {permission: 'public'}}
});

module.exports = mongoose.model('Space', spaceSchema);