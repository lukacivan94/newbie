const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    semesters: { type: Array},
    ects: { type: Number, required: true },
    ba_ma: { type: String, required: true },
    programme: {type: String, required: true},
    area: {type: String},
    languages: {type: Array},
    requirements: {type: String}
});

module.exports = mongoose.model('Course', courseSchema);
