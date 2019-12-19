const mongoose = require('mongoose');

const mentorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String},
    gender: {type: String},
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {type: String, required: true},
    programme: {type: String},
    areas: {type: Array},     //changed area to areas and type to array
    country: {type: String},
    languages: {type: Array},    //changed language to languages and type to array
    proglanguage: {type: String},
    meeting_time: {type: String},
    newbies: {
      names: {type: Array},
      emails: {type: Array}
    },
    mentorImage: {type: String}
});

module.exports = mongoose.model('Mentor', mentorSchema);
