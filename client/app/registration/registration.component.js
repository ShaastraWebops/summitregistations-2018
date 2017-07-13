'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './registration.routes';
// const sendgrid = reuqire('sendgrid')('fivune');
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
        member_names: [],
        member_emails: []
    };
    this.submitted = false;
  }

  $onInit() {
  this.step=1;
  }

  submitform(){
    this.$http.get('/api/participants').then(res => {
      this.count = res.data.length+1;
      if(this.count<10)
        this.summitID = 'SUM18000'+this.count;
      else if(this.count<100)
        this.summitID = 'SUM1800'+this.count;
      else if(this.count<1000)
        this.summitID = 'SUM180'+this.count;
      else if(this.count<10000)
        this.summitID = 'SUM18'+this.count;
      this.submit();
    });
  }

 submit(){
  this.submitted = true;

  this.names = [];
  this.emails = [];
  this.names.push(this.newparticipant.name);
  this.emails.push(this.newparticipant.email);
  if(this.newparticipant.mem2_name != null)
    {
      this.names.push(this.newparticipant.mem2_name);
      this.emails.push(this.newparticipant.mem2_email);
    }
  if(this.newparticipant.mem3_name != null)
  {
    this.names.push(this.newparticipant.mem3_name);
    this.emails.push(this.newparticipant.mem3_email);
  }
  if(this.newparticipant.mem4_name != null)
  {
    this.names.push(this.newparticipant.mem4_name);
    this.emails.push(this.newparticipant.mem4_email);
  }
  if(this.newparticipant.mem5_name != null)
  {
    this.names.push(this.newparticipant.mem5_name);
    this.emails.push(this.newparticipant.mem5_email);
  }

      this.$http.post('/api/participants', {
        insti: this.newparticipant.insti,
        stream: this.newparticipant.stream,
        summitID: this.summitID,
        mobile_no: this.newparticipant.mobile_no,
        alt_mobno: this.newparticipant.alt_mobno,
        q1_ans: this.newparticipant.q1_ans,
        q2_ans: this.newparticipant.q2_ans,
        team_name: this.newparticipant.team_name,
        member_names: this.names,
        member_emails: this.emails
      }).then(data => {
        /*var formData = new FormData;
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
                });*/
                if(data.data.success){
        window.alert('Registered Successfully!');
        window.location = '/';
      }
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
