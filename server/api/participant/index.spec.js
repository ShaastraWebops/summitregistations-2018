'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var participantCtrlStub = {
  index: 'participantCtrl.index',
  show: 'participantCtrl.show',
  create: 'participantCtrl.create',
  upsert: 'participantCtrl.upsert',
  patch: 'participantCtrl.patch',
  destroy: 'participantCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var participantIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './participant.controller': participantCtrlStub
});

describe('Participant API Router:', function() {
  it('should return an express router instance', function() {
    expect(participantIndex).to.equal(routerStub);
  });

  describe('GET /api/participants', function() {
    it('should route to participant.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'participantCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/participants/:id', function() {
    it('should route to participant.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'participantCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/participants', function() {
    it('should route to participant.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'participantCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/participants/:id', function() {
    it('should route to participant.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'participantCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/participants/:id', function() {
    it('should route to participant.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'participantCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/participants/:id', function() {
    it('should route to participant.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'participantCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
