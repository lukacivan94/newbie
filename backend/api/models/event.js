const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String},
    date_time: {type: String, required: true},
    place: {type: String, required: true},
    counter: {type: Number}
});

module.exports = mongoose.model('Event', eventSchema);
