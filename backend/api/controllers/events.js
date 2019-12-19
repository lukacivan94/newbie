const mongoose = require('mongoose');

const Event = require('../models/event');

exports.events_create_event = (req, res, next) => {
    const event = new Event({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        date_time: req.body.date_time,
        place: req.body.place,
        counter: req.body.counter
    });
    event
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
          message: 'Created event successfully',
          createdEvent: {
            title: result.title,
            date_time: result.date_time,
            place: result.place,
            counter: result.counter,
            _id: result._id,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/events/' + result._id
            }
          }
      });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.events_get_all = (req, res, next) => {
    Event.find()
    .select('title date_time place counter _id')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            events: docs.map(doc => {
              return {
                title: doc.title,
                date_time: doc.date_time,
                place: doc.place,
                counter: doc.counter,
                _id: doc._id,
                request: {
                  type: 'GET',
                  url: 'http://localhost:3000/events/' + doc._id
                }
              }
            })
        };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error:err
      });
    });
};

exports.events_get_event = (req, res, next) => {
    const id = req.params.eventId;
    Event.findById(id)
    .select('_id title date_time place counter')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if(doc){
        res.status(200).json({
          event: doc,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/events'
          }
        });
      } else {
        res.status(404).json({
          message: 'No valid entry found for provided ID'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
  };

exports.events_increment_event = (req, res, next) => {
  const id = req.params.eventId;
  // const updateOps = {};
  // for (const ops of req.body) {
  //     updateOps[ops.propName] = ops.value;
  // }
  //Event.update({_id: id }, { $set: updateOps})
  Event.update({_id: id }, { $set: {counter: req.body.counter}})
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'Event updated',
      request: {
        type: 'GET',
        url: 'http://localhost:3000/events/' + id
      }
    });
  })
  .catch(err => {
    console.log(err),
    res.status(200).json({
      error: err
    });
  });
};

exports.events_delete_event = (req, res, next) => {
  const id = req.params.eventId;
  Event.remove({ _id: id })
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'Event deleted',
      request: {
          type: 'POST',
          url: 'http://localhost:3000/events',
          body: {
            title: 'String'
          }
      }
    });
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
  });
};
