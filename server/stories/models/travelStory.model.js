const mongoose = require('mongoose');
const Schmea = mongoose.Schema;

const travelStorySchema = new Schmea({
    title: {type: String, required: true},
    story:{type: String, required: true},
    visitedLocation: {type: [String], default: []},
    isFavorite: {type: Boolean, default: false},
    userId: {type: Schmea.Types.ObjectId, ref: 'User', required: true},
    createdOn: {type: Date, default: Date.now},
    imageUrl: {type: String, required: true},
    visitedDate: {type: Date, required: true},
});

module.exports = mongoose.model('TravelStory', travelStorySchema);