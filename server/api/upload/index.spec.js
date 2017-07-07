'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var uploadCtrlStub = {
  index: 'uploadCtrl.index',
  show: 'uploadCtrl.show',
  create: 'uploadCtrl.create',
  upsert: 'uploadCtrl.upsert',
  patch: 'uploadCtrl.patch',
  destroy: 'uploadCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var uploadIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './upload.controller': uploadCtrlStub
});

describe('Upload API Router:', function() {
  it('should return an express router instance', function() {
    expect(uploadIndex).to.equal(routerStub);
  });

  describe('GET /api/uploads', function() {
    it('should route to upload.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'uploadCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/uploads/:id', function() {
    it('should route to upload.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'uploadCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/uploads', function() {
    it('should route to upload.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'uploadCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/uploads/:id', function() {
    it('should route to upload.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'uploadCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/uploads/:id', function() {
    it('should route to upload.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'uploadCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/uploads/:id', function() {
    it('should route to upload.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'uploadCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
