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
  return Participant.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
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
