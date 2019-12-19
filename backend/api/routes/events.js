const express = require('express'); //
const router = express.Router();  //
const mongoose = require('mongoose'); //

const Event = require('../models/event'); //
const EventsController = require('../controllers/events');

//Handle incoming get requests
router.post('/', EventsController.events_create_event);

router.get('/', EventsController.events_get_all);

router.get('/:eventId', EventsController.events_get_event);

router.patch('/:eventId', EventsController.events_increment_event);

router.delete('/:eventId', EventsController.events_delete_event);

module.exports = router;
