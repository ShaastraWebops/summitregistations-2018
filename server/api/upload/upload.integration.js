'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newUpload;

describe('Upload API:', function() {
  describe('GET /api/uploads', function() {
    var uploads;

    beforeEach(function(done) {
      request(app)
        .get('/api/uploads')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          uploads = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(uploads).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/uploads', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/uploads')
        .send({
          name: 'New Upload',
          info: 'This is the brand new upload!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newUpload = res.body;
          done();
        });
    });

    it('should respond with the newly created upload', function() {
      expect(newUpload.name).to.equal('New Upload');
      expect(newUpload.info).to.equal('This is the brand new upload!!!');
    });
  });

  describe('GET /api/uploads/:id', function() {
    var upload;

    beforeEach(function(done) {
      request(app)
        .get(`/api/uploads/${newUpload._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          upload = res.body;
          done();
        });
    });

    afterEach(function() {
      upload = {};
    });

    it('should respond with the requested upload', function() {
      expect(upload.name).to.equal('New Upload');
      expect(upload.info).to.equal('This is the brand new upload!!!');
    });
  });

  describe('PUT /api/uploads/:id', function() {
    var updatedUpload;

    beforeEach(function(done) {
      request(app)
        .put(`/api/uploads/${newUpload._id}`)
        .send({
          name: 'Updated Upload',
          info: 'This is the updated upload!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedUpload = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedUpload = {};
    });

    it('should respond with the updated upload', function() {
      expect(updatedUpload.name).to.equal('Updated Upload');
      expect(updatedUpload.info).to.equal('This is the updated upload!!!');
    });

    it('should respond with the updated upload on a subsequent GET', function(done) {
      request(app)
        .get(`/api/uploads/${newUpload._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let upload = res.body;

          expect(upload.name).to.equal('Updated Upload');
          expect(upload.info).to.equal('This is the updated upload!!!');

          done();
        });
    });
  });

  describe('PATCH /api/uploads/:id', function() {
    var patchedUpload;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/uploads/${newUpload._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Upload' },
          { op: 'replace', path: '/info', value: 'This is the patched upload!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedUpload = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedUpload = {};
    });

    it('should respond with the patched upload', function() {
      expect(patchedUpload.name).to.equal('Patched Upload');
      expect(patchedUpload.info).to.equal('This is the patched upload!!!');
    });
  });

  describe('DELETE /api/uploads/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/uploads/${newUpload._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when upload does not exist', function(done) {
      request(app)
        .delete(`/api/uploads/${newUpload._id}`)
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
