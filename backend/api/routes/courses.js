const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

//const Course = require('../models/course');
const CoursesController = require('../controllers/courses');

router.post('/', CoursesController.courses_create_course);

router.post('/recommendation', CoursesController.courses_get_recommended_courses);

router.get('/', CoursesController.courses_get_all);

router.get('/:courseId', CoursesController.courses_get_course);

router.patch('/:courseId',checkAuth, CoursesController.courses_update_course);

router.delete('/:courseId', CoursesController.courses_delete_course);

module.exports = router;
