const express = require('express');
const router = express.Router();
const multer = require('multer'); //
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const MentorsController = require('../controllers/mentors');

router.get('/', MentorsController.mentors_get_all);

router.post('/signup', MentorsController.mentors_signup);

router.post('/', upload.single('mentorImage'), MentorsController.mentors_create_mentor_with_image);

router.post('/findmentor', MentorsController.mentors_find_a_mentor);

router.post('/sendReminder', MentorsController.mentors_send_reminder);

router.post('/login', MentorsController.mentors_login);

router.get('/:mentorId', MentorsController.mentors_get_mentor);

router.delete('/:mentorId', MentorsController.mentors_delete);

router.patch('/:mentorId', MentorsController.mentors_assign_newbie_to_mentor);

module.exports = router;
