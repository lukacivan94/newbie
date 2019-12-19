const mongoose = require('mongoose');

const Course = require('../models/course');

exports.courses_create_course = (req, res, next) => {
    const course = new Course({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        semesters: req.body.semesters,
        ects: req.body.ects,
        ba_ma: req.body.ba_ma,
        programme: req.body.programme,
        area: req.body.area,
        languages: req.body.languages,
        requirements: req.body.requirements
    });
    course
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
          message: 'Created course successfully',
          createdCourse: {
            title: result.title,
            ba_ma: result.ba_ma,
            ects: result.ects,
            _id: result._id,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/courses/' + result._id
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

exports.courses_get_all = (req, res, next) => {
    Course.find()
    .select('title semesters area programme languages ba_ma ects requirements _id')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            courses: docs.map(doc => {
              return {
                title: doc.title,
                ects: doc.ects,
                ba_ma: doc.ba_ma,
                semesters: doc.semesters,
                area: doc.area,
                programme: doc.programme,
                languages: doc.languages,
                requirements: doc.requirements,
                _id: doc._id,
                request: {
                  type: 'GET',
                  url: 'http://localhost:3000/courses/' + doc._id
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

exports.courses_get_recommended_courses = (req, res, next) => {
    const query = req.body;
    const semesters = req.body.semesters;
    const languages = req.body.languages;
    const ects = req.body.ects;
    if (semesters == undefined){
          if (languages === undefined){
                if (ects === undefined){
                      Course.find(query)
                      .select('title semesters ects ba_ma programme area languages requirements _id')
                      .exec()
                      .then(docs => {
                          const response = {
                              count: docs.length,
                              courses: docs.map(doc => {
                                return {
                                  title: doc.title,
                                  semesters: doc.semesters,
                                  ects: doc.ects,
                                  ba_ma: doc.ba_ma,
                                  programme: doc.programme,
                                  area: doc.area,
                                  languages: doc.languages,
                                  requirements: doc.requirements,
                                  _id: doc._id,
                                  request: {
                                    type: 'GET',
                                    url: 'http://localhost:3000/courses/' + doc._id
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
                } else {
                      Course.find(query).find({ects: { $gt: ects-1 }})
                      .select('title semesters ects ba_ma programme area languages requirements _id')
                      .exec()
                      .then(docs => {
                          const response = {
                              count: docs.length,
                              courses: docs.map(doc => {
                                return {
                                  title: doc.title,
                                  semesters: doc.semesters,
                                  ects: doc.ects,
                                  ba_ma: doc.ba_ma,
                                  programme: doc.programme,
                                  area: doc.area,
                                  languages: doc.languages,
                                  requirements: doc.requirements,
                                  _id: doc._id,
                                  request: {
                                    type: 'GET',
                                    url: 'http://localhost:3000/courses/' + doc._id
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
                }
          } else {
                if (ects === undefined){
                      Course.find(query).find({ languages: { $in: languages }})
                      .select('title semesters ects ba_ma programme area languages requirements _id')
                      .exec()
                      .then(docs => {
                          const response = {
                              count: docs.length,
                              courses: docs.map(doc => {
                                return {
                                  title: doc.title,
                                  semesters: doc.semesters,
                                  ects: doc.ects,
                                  ba_ma: doc.ba_ma,
                                  programme: doc.programme,
                                  area: doc.area,
                                  languages: doc.languages,
                                  requirements: doc.requirements,
                                  _id: doc._id,
                                  request: {
                                    type: 'GET',
                                    url: 'http://localhost:3000/courses/' + doc._id
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
                  } else {
                      Course.find(query).find({languages: { $in: languages }, ects: { $gt: ects-1 }})
                      .select('title semesters ects ba_ma programme area languages requirements _id')
                      .exec()
                      .then(docs => {
                          const response = {
                              count: docs.length,
                              courses: docs.map(doc => {
                                return {
                                  title: doc.title,
                                  semesters: doc.semesters,
                                  ects: doc.ects,
                                  ba_ma: doc.ba_ma,
                                  programme: doc.programme,
                                  area: doc.area,
                                  languages: doc.languages,
                                  requirements: doc.requirements,
                                  _id: doc._id,
                                  request: {
                                    type: 'GET',
                                    url: 'http://localhost:3000/courses/' + doc._id
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
                    }
                  }
            } else {
              if (languages === undefined){
                    if (ects === undefined){
                          Course.find(query).find({ semesters: { $in: semesters }})
                          .select('title semesters ects ba_ma programme area languages requirements _id')
                          .exec()
                          .then(docs => {
                              const response = {
                                  count: docs.length,
                                  courses: docs.map(doc => {
                                    return {
                                      title: doc.title,
                                      semesters: doc.semesters,
                                      ects: doc.ects,
                                      ba_ma: doc.ba_ma,
                                      programme: doc.programme,
                                      area: doc.area,
                                      languages: doc.languages,
                                      requirements: doc.requirements,
                                      _id: doc._id,
                                      request: {
                                        type: 'GET',
                                        url: 'http://localhost:3000/courses/' + doc._id
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
                      } else {
                          Course.find(query).find({semesters: { $in: semesters }, ects: { $gt: ects-1 }})
                          .select('title semesters ects ba_ma programme area languages requirements _id')
                          .exec()
                          .then(docs => {
                              const response = {
                                  count: docs.length,
                                  courses: docs.map(doc => {
                                    return {
                                      title: doc.title,
                                      semesters: doc.semesters,
                                      ects: doc.ects,
                                      ba_ma: doc.ba_ma,
                                      programme: doc.programme,
                                      area: doc.area,
                                      languages: doc.languages,
                                      requirements: doc.requirements,
                                      _id: doc._id,
                                      request: {
                                        type: 'GET',
                                        url: 'http://localhost:3000/courses/' + doc._id
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
                        }
                  } else {


                    if (ects === undefined){
                          Course.find(query).find({ languages: { $in: languages }, semesters: { $in: semesters }})
                          .select('title semesters ects ba_ma programme area languages requirements _id')
                          .exec()
                          .then(docs => {
                              const response = {
                                  count: docs.length,
                                  courses: docs.map(doc => {
                                    return {
                                      title: doc.title,
                                      semesters: doc.semesters,
                                      ects: doc.ects,
                                      ba_ma: doc.ba_ma,
                                      programme: doc.programme,
                                      area: doc.area,
                                      languages: doc.languages,
                                      requirements: doc.requirements,
                                      _id: doc._id,
                                      request: {
                                        type: 'GET',
                                        url: 'http://localhost:3000/courses/' + doc._id
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
                      } else {
                          Course.find(query).find({languages: { $in: languages }, semesters: { $in: semesters }, ects: { $gt: ects-1 }})
                          .select('title semesters ects ba_ma programme area languages requirements _id')
                          .exec()
                          .then(docs => {
                              const response = {
                                  count: docs.length,
                                  courses: docs.map(doc => {
                                    return {
                                      title: doc.title,
                                      semesters: doc.semesters,
                                      ects: doc.ects,
                                      ba_ma: doc.ba_ma,
                                      programme: doc.programme,
                                      area: doc.area,
                                      languages: doc.languages,
                                      requirements: doc.requirements,
                                      _id: doc._id,
                                      request: {
                                        type: 'GET',
                                        url: 'http://localhost:3000/courses/' + doc._id
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
                        }
                      }
                    }
};

exports.courses_get_course = (req, res, next) => {
    const id = req.params.courseId;
    Course.findById(id)
    .select('_id title semesters ects ba_ma programme area languages requirements')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if(doc){
        res.status(200).json({
          course: doc,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/courses'
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

  exports.courses_update_course = (req, res, next) => {
    const id = req.params.courseId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Course.update({_id: id }, { $set: updateOps})
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Course updated',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/courses/' + id
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

  exports.courses_delete_course = (req, res, next) => {
    const id = req.params.courseId;
    Course.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Course deleted',
        request: {
            type: 'POST',
            url: 'http://localhost:3000/courses',
            body: {
              title: 'String', ects: 'Number'
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
