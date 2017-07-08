'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newParticipant;

describe('Participant API:', function() {
  describe('GET /api/participants', function() {
    var participants;

    beforeEach(function(done) {
      request(app)
        .get('/api/participants')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          participants = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(participants).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/participants', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/participants')
        .send({
          name: 'New Participant',
          info: 'This is the brand new participant!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newParticipant = res.body;
          done();
        });
    });

    it('should respond with the newly created participant', function() {
      expect(newParticipant.name).to.equal('New Participant');
      expect(newParticipant.info).to.equal('This is the brand new participant!!!');
    });
  });

  describe('GET /api/participants/:id', function() {
    var participant;

    beforeEach(function(done) {
      request(app)
        .get(`/api/participants/${newParticipant._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          participant = res.body;
          done();
        });
    });

    afterEach(function() {
      participant = {};
    });

    it('should respond with the requested participant', function() {
      expect(participant.name).to.equal('New Participant');
      expect(participant.info).to.equal('This is the brand new participant!!!');
    });
  });

  describe('PUT /api/participants/:id', function() {
    var updatedParticipant;

    beforeEach(function(done) {
      request(app)
        .put(`/api/participants/${newParticipant._id}`)
        .send({
          name: 'Updated Participant',
          info: 'This is the updated participant!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedParticipant = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedParticipant = {};
    });

    it('should respond with the updated participant', function() {
      expect(updatedParticipant.name).to.equal('Updated Participant');
      expect(updatedParticipant.info).to.equal('This is the updated participant!!!');
    });

    it('should respond with the updated participant on a subsequent GET', function(done) {
      request(app)
        .get(`/api/participants/${newParticipant._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let participant = res.body;

          expect(participant.name).to.equal('Updated Participant');
          expect(participant.info).to.equal('This is the updated participant!!!');

          done();
        });
    });
  });

  describe('PATCH /api/participants/:id', function() {
    var patchedParticipant;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/participants/${newParticipant._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Participant' },
          { op: 'replace', path: '/info', value: 'This is the patched participant!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedParticipant = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedParticipant = {};
    });

    it('should respond with the patched participant', function() {
      expect(patchedParticipant.name).to.equal('Patched Participant');
      expect(patchedParticipant.info).to.equal('This is the patched participant!!!');
    });
  });

  describe('DELETE /api/participants/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/participants/${newParticipant._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when participant does not exist', function(done) {
      request(app)
        .delete(`/api/participants/${newParticipant._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
