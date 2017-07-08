'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('entries', {
      url: '/entries',
      template: '<entries></entries>'
    });
}
