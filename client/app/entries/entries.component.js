'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './entries.routes';

export class EntriesComponent {
  /*@ngInject*/
  constructor($http, Auth, $scope, FileSaver) {
    this.$http = $http;
    this.$scope = $scope;
        this.FileSaver = FileSaver;
    this.isAdmin = Auth.isAdminSync;
  }

  $onInit() {
    this.$http.get('/api/participants').then(res => {
      this.mem = res.data;
      console.log(this.data);
    })
  }
  download = function(name,team) {
    this.$http.get('/file/'+ name,{ responseType: "arraybuffer"  }).then(response => {
      var blob = new Blob([response.data], { type: "application/pdf"});
    this.FileSaver.saveAs(blob, team + ".pdf");
    });
  }
}

/*download() {

  var data = new Blob([response.data], { type: 'application/pdf;charset=utf-8' });
        this.FileSaver.saveAs(data, 'resume'+this.mem.team_name);
}*/

export default angular.module('summitregistations2018App.entries', [uiRouter])
  .config(routes)
  .component('entries', {
    template: require('./entries.html'),
    controller: EntriesComponent,
    controllerAs: 'entriesCtrl'
  })
  .name;
