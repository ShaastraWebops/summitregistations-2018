'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './registration.routes';

export class RegistrationComponent {

  
  /*@ngInject*/
  socket;
  
steps=[];

  constructor($scope,socket) {
    
    this.socket = socket;
    this.$scope = $scope;
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('registration');
    });
  }

  $onInit() {
    step=1;
  }

 
       
}

export default angular.module('summitregistations2018App.registration', [uiRouter])
  .config(routes)
  .component('registration', {
    template: require('./registration.html'),
    controller: RegistrationComponent,
    controllerAs: 'registrationCtrl'
  })
  .name;
