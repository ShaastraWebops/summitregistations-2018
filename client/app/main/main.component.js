import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  /*@ngInject*/
  constructor($http, Auth) {
    this.$http = $http;
    this.isAdmin = Auth.isAdminSync;
  }

  entries(){
    window.location='/entries';
  }
  
  register(){
    window.location='/registration';
  }

  openBrochure(){
    window.open('http://shaastra.org/images/Participant Brochure.pdf', '_blank');
  }

  openPS(){
    window.open('http://shaastra.org/images/List of Problem Statements.pdf', '_blank');
  }
}

export default angular.module('summitregistations2018App.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'mainCtrl'
  })
  .name;
