'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './registration.routes';

export class RegistrationComponent {

  members = [];

  constructor($http) {
        'ngInject';

    this.$http = $http;
    this.newparticipant = {
        name: '',
        insti: '',
        stream: '',
        mobile_no: '',
        alt_mobno: '',
        email: '',
        q1_ans: '',
        q2_ans: '',
        team_name: '',
        members: []
    };
    this.submitted = false;
  }

  $onInit() {
  this.step=1;
  }

 submitform(){
  this.submitted = true;
  
  this.members = [];
  this.members.push({name: this.newparticipant.name, email: this.newparticipant.email});
  if(this.newparticipant.mem2_name != '')
    this.members.push({name: this.newparticipant.mem2_name, email: this.newparticipant.mem2_email});
  if(this.newparticipant.mem3_name != '')
    this.members.push({name: this.newparticipant.mem3_name, email: this.newparticipant.mem3_email});
  if(this.newparticipant.mem4_name != '')
    this.members.push({name: this.newparticipant.mem4_name, email: this.newparticipant.mem4_email});
  if(this.newparticipant.mem5_name != '')
    this.members.push({name: this.newparticipant.mem5_name, email: this.newparticipant.mem5_email});
      
      this.$http.post('/api/participants', {
        insti: this.newparticipant.insti,
        stream: this.newparticipant.stream,
        mobile_no: this.newparticipant.mobile_no,
        alt_mobno: this.newparticipant.alt_mobno,
        q1_ans: this.newparticipant.q1_ans,
        q2_ans: this.newparticipant.q2_ans,
        team_name: this.newparticipant.team_name,
        members: this.members
      }).then(data => {
        var formData = new FormData;
                var file = $('#file')[0].files[0];
                console.log(file);
                formData.append('uploadedFile', file);
                this.$http.post('/api/uploads/' + data.data._id , formData, {

                  transformRequest: angular.identity,
                  headers: {
                    'Content-Type': undefined
                  }
                }).then(response => {
                  angular.element("input[name='file']").val(null);
                  angular.element("input[name='file_name']").val(null);
                });
        
      });
  }

}

export default angular.module('summitregistations2018App.registration', [uiRouter])
  .config(routes)
  .component('registration', {
    template: require('./registration.html'),
    controller: RegistrationComponent,
    controllerAs: 'ctrl'
  })
  .name;
