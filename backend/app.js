const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');


const courseRoutes = require('./api/routes/courses');
const mentorRoutes = require('./api/routes/mentors');
const eventRoutes = require('./api/routes/events');

mongoose.connect(
  'mongodb+srv://newbie_admin:' +
    process.env.MONGO_ATLAS_PW +
    '@cluster0-xnnw6.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser: true
}
);
mongoose.Promise = global.Promise;


app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method')); ///////


app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//Routes which should handle requests
app.use('/courses', courseRoutes);
app.use('/mentors', mentorRoutes);
app.use('/events', eventRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
      error: {
        message: error.message
      }
  });
});

module.exports = app;
