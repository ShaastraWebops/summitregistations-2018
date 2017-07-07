'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './registration.routes';

export class RegistrationComponent {

  constructor($http) {
        'ngInject';

    this.$http = $http;
    this.newparticpant = {
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
  }

  $onInit() {
  this.step=1;
  }

 submitform(){
  console.log(this.newparticpant);
      this.$http.post('/api/participants', {
        name: this.newparticpant.name,
        insti: this.newparticpant.insti,
        stream: this.newparticpant.stream,
        mobile_no: this.newparticpant.mobile_no,
        alt_mobno: this.newparticpant.alt_mobno,
        email: this.newparticpant.email,
        resumeurl: this.newparticpant.resumeurl,
        q1_ans: this.newparticpant.q1_ans,
        q2_ans: this.newparticpant.q2_ans,
        team_name: this.newparticpant.team_name,
        mem1_name: this.newparticpant.mem1_name,
        mem1_email: this.newparticpant.mem1_email,
        mem2_name: this.newparticpant.mem2_name,
        mem2_email: this.newparticpant.mem2_email,
        mem3_name: this.newparticpant.mem3_name,
        mem3_email: this.newparticpant.mem3_email,
        mem4_name: this.newparticpant.mem4_name,
        mem4_email: this.newparticpant.mem4_email,
        mem5_name: this.newparticpant.mem5_name,
        mem5_email: this.newparticpant.mem5_email
      }).then(() => {
        console.log('done');
        this.newparticpant = {};
      });
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
