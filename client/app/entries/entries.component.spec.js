'use strict';

describe('Component: EntriesComponent', function() {
  // load the controller's module
  beforeEach(module('summitregistations2018App.entries'));

  var EntriesComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    EntriesComponent = $componentController('entries', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
