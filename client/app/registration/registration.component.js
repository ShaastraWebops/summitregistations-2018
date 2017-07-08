'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './registration.routes';

export class RegistrationComponent {

  constructor($http) {
        'ngInject';

    this.$http = $http;
    this.newparticipant = {
      name: 'gokulan',
        insti: '',
        stream: '',
        mobile_no: '',
        alt_mobno: '',
        email: '',
        resumeurl: '',
        q1_ans: '',
        q2_ans: '',
        team_name: '',
        mem1_name: '',
        mem1_email: '',
        mem2_name: '',
        mem2_email: '',
        mem3_name: '',
        mem3_email: '',
        mem4_name: '',
        mem4_email: '',
        mem5_name: '',
        mem5_email: ''
    };
    this.submitted = false;
  }

  $onInit() {
  this.step=1;
  }

 submitform(){
  this.submitted = true;
      this.$http.post('/api/participants', {
        name: this.newparticipant.name,
        insti: this.newparticipant.insti,
        stream: this.newparticipant.stream,
        mobile_no: this.newparticipant.mobile_no,
        alt_mobno: this.newparticipant.alt_mobno,
        email: this.newparticipant.email,
        resumeurl: this.newparticipant.resumeurl,
        q1_ans: this.newparticipant.q1_ans,
        q2_ans: this.newparticipant.q2_ans,
        team_name: this.newparticipant.team_name,
        mem1_name: this.newparticipant.mem1_name,
        mem1_email: this.newparticipant.mem1_email,
        mem2_name: this.newparticipant.mem2_name,
        mem2_email: this.newparticipant.mem2_email,
        mem3_name: this.newparticipant.mem3_name,
        mem3_email: this.newparticipant.mem3_email,
        mem4_name: this.newparticipant.mem4_name,
        mem4_email: this.newparticipant.mem4_email,
        mem5_name: this.newparticipant.mem5_name,
        mem5_email: this.newparticipant.mem5_email
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
        console.log('done');
        this.newparticipant = {};
      });
  }

  changes(){
    console.log(this.newparticipant.name);
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
