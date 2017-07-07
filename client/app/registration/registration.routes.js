'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('registration', {
      url: '/registration',
      template: '<registration></registration>'
    });
}
