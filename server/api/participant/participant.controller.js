/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/participants              ->  index
 * POST    /api/participants              ->  create
 * GET     /api/participants/:id          ->  show
 * PUT     /api/participants/:id          ->  upsert
 * PATCH   /api/participants/:id          ->  patch
 * DELETE  /api/participants/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Participant from './participant.model';
var json2csv = require('json2csv');
var sendgrid = require("sendgrid")(process.env.SENDGRID);


function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Participants
export function index(req, res) {
  return Participant.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Participant from the DB
export function show(req, res) {
  return Participant.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Participant in the DB
export function create(req, res) {
  //Participant.members.push(req.body.members);
  var array = [];
  array = req.body.member_emails;
  Participant.find().exec().then( res1=>{
     var count = res1.length;
     if(count<10)
        req.body.summitID = 'SUM18000'+count;
      else if(count<100)
        req.body.summitID = 'SUM1800'+count;
      else if(count<1000)
        req.body.summitID = 'SUM180'+count;
      else if(count<10000)
        req.body.summitID = 'SUM18'+count;

      console.log(count+req.body.summitID+"SUMMIT");
      return Participant.create(req.body)
        .then( data => {
          var text_body = '<html><body>Dear Applicant,<br><br>'+
                            'Greetings from Green Energy Summit team, Shaastra 2018!<br><br>'+
                            'Thank you for registering for Rural Energy Challenge. Your Summit ID: '+req.body.summitID+' <br>'+
                            'Please note your Summit ID and include it in all further communications. <br><br> '+
                            'The Green Energy Summit will be held from 4th January to 7th January during Shaastra 2018, IIT Madras. It is a platform for discussion and debate on various aspects of Green Energy. The summit aims to engage conscientious individuals in useful dialogue with experts in the field. Through unconventional lectures and discussions, and interactive workshops, the Green Energy Summit promises to be a journey of unparalleled learning and insights.'+
                            '<br><br>Details regarding the selection procedure for Green Energy Summit will be mailed to you shortly.<br><br>'+
                            'Feel free to contact us in case of any queries. All emails should be sent to <a href="mailto:summitregistrations@shaastra.org">summitregistrations@shaastra.org</a>.<br><br>' +
                            'Regards, <br> Green Energy Summit team <br> Shaastra 2018 <br> IIT Madras'
                            '</body></html>'
          var params = {
              to: array,
              from: 'webops@shaastra.org',
              cc: 'summitregistrations@shaastra.org',
              fromname: 'Shaastra WebOps',
              subject: 'Shaastra 2018 || Summit',
              html: text_body
          };
          var email = new sendgrid.Email(params);
          sendgrid.send(email, function (err, json) {
            if(err)
              console.log('Error sending mail - ', err);
            else
              {
                console.log('Success sending mail - ', json);
              }
          });
          res.json({success: true, id: data._id});
        })
        .catch(handleError(res));

      });
}

export function exp(req, res) {
  console.log("HI");
  return Participant.find({}).exec()
    .then(participants => {
      for(var i=0;i<participants.length;i++)
      {
        participants[i].resume = participants[i].team_name + '.pdf';   //As resume files are downloaded with the name as the team_name
      }

      var fields = ['summitID', 'insti','stream','mobile_no','alt_mobno','q1_ans','q2_ans','resume','team_name',
      {
        label: 'Member 1: Name',
        value: 'member_names[0]'
      },
      {
        label: 'Member 1: Email',
        value: 'member_emails[0]'
      },
      {
        label: 'Member 2: Name',
        value: 'member_names[1]'
      },
      {
        label: 'Member 2: Email',
        value: 'member_emails[1]'
      },
      {
        label: 'Member 3: Name',
        value: 'member_names[2]'
      },
      {
        label: 'Member 3: Email',
        value: 'member_emails[2]'
      },
      {
        label: 'Member 4: Name',
        value: 'member_names[3]'
      },
      {
        label: 'Member 4: Email',
        value: 'member_emails[3]'
      },
      {
        label: 'Member 5: Name',
        value: 'member_names[4]'
      },
      {
        label: 'Member 5: Email',
        value: 'member_emails[4]'
      }];
      var csv = json2csv({ data: participants, fields: fields});
      res.setHeader('Content-disposition', 'attachment; filename=participants.csv');
      res.set('Content-Type', 'text/csv');
      res.status(200).send(csv);
    })
    .catch(handleError(res));
}

// Upserts the given Participant in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Participant.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Participant in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Participant.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Participant from the DB
export function destroy(req, res) {
  return Participant.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
