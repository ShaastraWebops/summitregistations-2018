'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './entries.routes';

export class EntriesComponent {
  /*@ngInject*/
  constructor($http, Auth) {
    this.$http = $http;
    this.isAdmin = Auth.isAdminSync;
  }

  $onInit() {
    this.$http.get('/api/participants').then(res => {
      this.mem = res.data;
      console.log(this.data);
    })
  }
}

export default angular.module('summitregistations2018App.entries', [uiRouter])
  .config(routes)
  .component('entries', {
    template: require('./entries.html'),
    controller: EntriesComponent,
    controllerAs: 'entriesCtrl'
  })
  .name;
