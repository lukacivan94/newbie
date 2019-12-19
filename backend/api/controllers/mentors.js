const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const Mentor = require('../models/mentor');

exports.mentors_get_all =  (req, res, next) => {
  Mentor.find()
  .select('name gender email password languages proglanguage programme areas country meeting_time newbies mentorImage _id')
  .exec()
  .then(docs => {
    res.status(200).json({
      count: docs.length,
      mentors: docs.map(doc => {
        return {
          _id: doc._id,
          name: doc.name,
          gender: doc.gender,
          email: doc.email,
          password: doc.password,
          languages: doc.languages,
          programme: doc.programme,
          areas: doc.areas,
          country: doc.country,
          proglanguage: doc.proglanguage,
          meeting_time: doc.meeting_time,
          newbies: doc.newbies,
          mentorImage: doc.mentorImage,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/mentors/' + doc._id
          }
        }
      }),
    });
  })
  .catch(err => {
    res.status(500).json({
      error:err
    });
  });
};

exports.mentors_signup = (req, res, next) => {
  Mentor.find({email: req.body.email})
  .exec()
  .then(mentor => {
    if(mentor.length >= 1) {
      return res.status(409).json({
        message: 'Mail exists'
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
          return res.status(500).json({
            error: err
          });
        } else {
          const mentor = new Mentor({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email,
            password: hash,
            programme: req.body.programme,
            areas: req.body.areas,
            country: req.body.country,
            languages: req.body.languages,
            proglanguage: req.body.proglanguage,
            meeting_time: req.body.meeting_time,
            newbies: req.body.newbies,
          });
          mentor
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              mentor: mentor
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
        }
      });
    }
  });
};

exports.mentors_create_mentor_with_image = (req, res, next) => {
  Mentor.find({email: req.body.email})
  .exec()
  .then(mentor => {
    if(mentor.length >= 1) {
      return res.status(409).json({
        message: 'Mail exists'
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err){
          return res.status(500).json({
            error: err
          });
        } else {
          const mentor = new Mentor({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email,
            password: hash,
            programme: req.body.programme,
            areas: req.body.areas,
            country: req.body.country,
            languages: req.body.languages,
            proglanguage: req.body.proglanguage,
            meeting_time: req.body.meeting_time,
            newbies: req.body.newbies,
            mentorImage: req.body.mentorImage
          });
          mentor
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              mentor: mentor
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
        }
      });
    }
  });
};

exports.mentors_login = (req, res, next) => {
  Mentor.find({ email: req.body.email})
  .exec()
  .then(mentor => {
    if (mentor.length < 1) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    bcrypt.compare(req.body.password, mentor[0].password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            email: mentor[0].email,
            mentorId: mentor[0]._id
          },
          process.env.JWT_KEY,
          {
            expiresIn:"1h"
          },
        );
        return res.status(200).json({
          message: 'Auth successful',
          mentor: mentor[0],
          token: token
        });
      }
      res.status(401).json({
        message: 'Auth failed'
      });
    });
  })
  .catch(err => {
    console.log(err),
    res.status(500).json({
      error: err
    });
  });
};

exports.mentors_get_mentor = (req, res, next) => {
  Mentor.findById(req.params.mentorId)
  .select('name gender email password areas programme languages proglanguage meeting_time newbies mentorImage _id')
  .exec()
  .then(mentor => {
    if(!mentor) {
      return res.status(404).json({
        message: 'Mentor not found'
      });
    }
    res.status(200).json({
      mentor: mentor,
      request: {
        type: 'GET',
        url: 'http://localhost:3000/mentors'
      }
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  });
};

exports.mentors_delete = (req, res, next) => {
  Mentor.remove({ _id: req.params.mentorId})
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'Mentor deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/mentors',
        body: { courseId: "ID", name: "Name"}
      }
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
};
exports.mentors_find_a_mentor = (req, res, next) => {
  const query = req.body;
  const areas = req.body.areas;
  const languages = req.body.languages;
  if (areas == undefined){
    if (languages === undefined){
      Mentor.find(query)
      .select('name gender email programme areas languages proglanguage meeting_time newbies _id')
      .exec()
      .then(docs => {
        if(docs.length === 0){
          Mentor.find({ programme: "Informatics" })
          .select('name gender email programme areas languages proglanguage meeting_time newbies _id')
          .exec()
          .then(docs2 => {
            console.log(docs2, docs2.length);
            let response2 = {
                  count: docs2.length,
                  mentors: docs2.map(doc2 => {
                    return {
                      name: doc2.name,
                      gender: doc2.gender,
                      email: doc2.email,
                      proglanguage: doc2.proglanguage,
                      programme: doc2.programme,
                      areas: doc2.areas,
                      languages: doc2.languages,
                      meeting_time: doc2.meeting_time,
                      newbies: doc2.newbies,
                      mentorImage: doc2.mentorImage,
                      _id: doc2._id,
                      request: {
                        type: 'GET',
                        url: 'http://localhost:3000/mentors/' + doc2._id
                      }
                    }
                  })
              };
              console.log(response2);
              res.status(200).json(response2);
          })
        } else {
          let response = {
              count: docs.length,
              mentors: docs.map(doc => {
                return {
                  name: doc.name,
                  gender: doc.gender,
                  email: doc.email,
                  proglanguage: doc.proglanguage,
                  programme: doc.programme,
                  areas: doc.areas,
                  languages: doc.languages,
                  meeting_time: doc.meeting_time,
                  newbies: doc.newbies,
                  mentorImage: doc.mentorImage,
                  _id: doc._id,
                  request: {
                    type: 'GET',
                    url: 'http://localhost:3000/mentors/' + doc._id
                  }
                }
              })
          };
          console.log(response);
          res.status(200).json(response);
        };

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error:err
        });
      });
    } else {
      Mentor.find(query).find({ languages: { $in: languages }})
      .select('name gender email programme areas meeting_time languages proglanguage newbies _id')
      .exec()
      .then(docs => {
        if(docs.length === 0){
          Mentor.find({ programme: "Informatics" })
          .select('name gender email programme areas languages proglanguage meeting_time newbies _id')
          .exec()
          .then(docs2 => {
            console.log(docs2, docs2.length);
            let response2 = {
                  count: docs2.length,
                  mentors: docs2.map(doc2 => {
                    return {
                      name: doc2.name,
                      gender: doc2.gender,
                      email: doc2.email,
                      proglanguage: doc2.proglanguage,
                      programme: doc2.programme,
                      areas: doc2.areas,
                      languages: doc2.languages,
                      meeting_time: doc2.meeting_time,
                      newbies: doc2.newbies,
                      mentorImage: doc2.mentorImage,
                      _id: doc2._id,
                      request: {
                        type: 'GET',
                        url: 'http://localhost:3000/mentors/' + doc2._id
                      }
                    }
                  })
              };
              console.log(response2);
              res.status(200).json(response2);
          })
        } else {
          let response = {
              count: docs.length,
              mentors: docs.map(doc => {
                return {
                  name: doc.name,
                  gender: doc.gender,
                  email: doc.email,
                  proglanguage: doc.proglanguage,
                  programme: doc.programme,
                  areas: doc.areas,
                  languages: doc.languages,
                  meeting_time: doc.meeting_time,
                  newbies: doc.newbies,
                  mentorImage: doc.mentorImage,
                  _id: doc._id,
                  request: {
                    type: 'GET',
                    url: 'http://localhost:3000/mentors/' + doc._id
                  }
                }
              })
          };
          console.log(response);
          res.status(200).json(response);
        };
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error:err
        });
      });
    }
  } else {
    if (languages === undefined){
      Mentor.find(query).find({ areas: { $in: areas }})
      .select('name gender email programme areas meeting_time languages proglanguage newbies _id')
      .exec()
      .then(docs => {
        if(docs.length === 0){
          Mentor.find({ programme: "Informatics" })
          .select('name gender email programme areas languages proglanguage meeting_time newbies _id')
          .exec()
          .then(docs2 => {
            console.log(docs2, docs2.length);
            let response2 = {
                  count: docs2.length,
                  mentors: docs2.map(doc2 => {
                    return {
                      name: doc2.name,
                      gender: doc2.gender,
                      email: doc2.email,
                      proglanguage: doc2.proglanguage,
                      programme: doc2.programme,
                      areas: doc2.areas,
                      languages: doc2.languages,
                      meeting_time: doc2.meeting_time,
                      newbies: doc2.newbies,
                      mentorImage: doc2.mentorImage,
                      _id: doc2._id,
                      request: {
                        type: 'GET',
                        url: 'http://localhost:3000/mentors/' + doc2._id
                      }
                    }
                  })
              };
              console.log(response2);
              res.status(200).json(response2);
          })
        } else {
          let response = {
              count: docs.length,
              mentors: docs.map(doc => {
                return {
                  name: doc.name,
                  gender: doc.gender,
                  email: doc.email,
                  proglanguage: doc.proglanguage,
                  programme: doc.programme,
                  areas: doc.areas,
                  languages: doc.languages,
                  meeting_time: doc.meeting_time,
                  newbies: doc.newbies,
                  mentorImage: doc.mentorImage,
                  _id: doc._id,
                  request: {
                    type: 'GET',
                    url: 'http://localhost:3000/mentors/' + doc._id
                  }
                }
              })
          };
          console.log(response);
          res.status(200).json(response);
        };
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error:err
        });
      });
    } else {
      Mentor.find(query).find({ languages: { $in: languages }, areas: { $in: areas }})
      .select('name gender email programme areas meeting_time languages proglanguage newbies _id')
      .exec()
      .then(docs => {
        if(docs.length === 0){
          Mentor.find({ programme: "Informatics" })
          .select('name gender email programme areas languages proglanguage meeting_time newbies _id')
          .exec()
          .then(docs2 => {
            console.log(docs2, docs2.length);
            let response2 = {
                  count: docs2.length,
                  mentors: docs2.map(doc2 => {
                    return {
                      name: doc2.name,
                      gender: doc2.gender,
                      email: doc2.email,
                      proglanguage: doc2.proglanguage,
                      programme: doc2.programme,
                      areas: doc2.areas,
                      languages: doc2.languages,
                      meeting_time: doc2.meeting_time,
                      newbies: doc2.newbies,
                      mentorImage: doc2.mentorImage,
                      _id: doc2._id,
                      request: {
                        type: 'GET',
                        url: 'http://localhost:3000/mentors/' + doc2._id
                      }
                    }
                  })
              };
              console.log(response2);
              res.status(200).json(response2);
          })
        } else {
          let response = {
              count: docs.length,
              mentors: docs.map(doc => {
                return {
                  name: doc.name,
                  gender: doc.gender,
                  email: doc.email,
                  proglanguage: doc.proglanguage,
                  programme: doc.programme,
                  areas: doc.areas,
                  languages: doc.languages,
                  meeting_time: doc.meeting_time,
                  newbies: doc.newbies,
                  mentorImage: doc.mentorImage,
                  _id: doc._id,
                  request: {
                    type: 'GET',
                    url: 'http://localhost:3000/mentors/' + doc._id
                  }
                }
              })
          };
          console.log(response);
          res.status(200).json(response);
        };
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error:err
        });
      });
    }
  }
};

exports.mentors_assign_newbie_to_mentor = (req, res, next) => {
  const id = req.params.mentorId;
  Mentor.update({_id: id }, { $set: {newbies: req.body.newbies}})
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'Mentor updated',
      request: {
        type: 'GET',
        url: 'http://localhost:3000/mentors/' + id
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

exports.mentors_send_reminder = (req, res, next) => {
  const contacts = req.body.contacts;
  const output = `
    <p> You have a new reminder from your mentor</p>
    <h3>Reminder details</h3>
    <ul>
      <li>Message: You have a meeting with your mentor next ${req.body.meeting_time}</li>
      <li>You will meet your mentor at the public display</li>
      <li>Your mentor: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
  `;
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
      user: 'tumnewbie@gmail.com',
      pass: 'newbie123'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let HelperOptions = {
    from: '"Newbie Mentor" tumnewbie@gmail.com',
    to: contacts,
    subject: 'Reminder',
    html: output
  };

  transporter.sendMail(HelperOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(200).json({
        error: error
      });
      return
    }
    console.log("The message was sent!");
    console.log(info);
    res.status(200).json({
      message: "The message was sent!"
    });
  });
};
