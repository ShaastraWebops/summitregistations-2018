'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './registration.routes';
// const sendgrid = reuqire('sendgrid')('fivune');
export class RegistrationComponent {

  members = [];

  constructor($http,$scope) {
        'ngInject';

    this.$http = $http;
    this.fileerror = true;
    this.error = true;
    this.$scope = $scope;
    this.newparticipant = {
        name: '',
        insti: '',
        stream: '',
        mobile_no: '',
        alt_mobno: '',
        email: '',
        q1_ans: '',
        q2_ans: '',
        q3_ans: '',
        q4_ans: ''
    };
    this.submitted = false;
  }

  $onInit() {
   this.step=1;
   var app = this;
   $('#file').on('change', function() {
     var file = $('#file')[0].files[0];
     if(!file.name.match(/\.(pdf)$/))
     {
       $('#errormsg').html("Only PDF files allowed");
       app.fileerror = true;
       angular.element("input[name='file']").val(null);
       angular.element("input[name='file_name']").val(null);
     }
     else {
       $('#errormsg').html("");
       app.fileerror = false;
     }

   })

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
  if(this.fileerror)
  {
    window.alert('File is not uploaded yet');
    return;
  }
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
  if(this.newparticipant.q4_ans == 1)
  {
    this.newparticipant.q4_ans = "Facebook/Twitter";
  }
  else if(this.newparticipant.q4_ans == 2)
  {
    this.newparticipant.q4_ans = "Mailout";
  }
  else if(this.newparticipant.q4_ans == 3)
  {
    this.newparticipant.q4_ans = "Poster";
  }
  else if(this.newparticipant.q4_ans == 4)
  {
    this.newparticipant.q4_ans = "Website";
  }
  else if(this.newparticipant.q4_ans == 5)
  {
    this.newparticipant.q4_ans = "Friends";
  }
  else if(this.newparticipant.q4_ans == 6)
  {
    this.newparticipant.q4_ans = "Others";
  }
  else {
    this.error = true;
  }
      this.$http.post('/api/participants', {
        insti: this.newparticipant.insti,
        stream: this.newparticipant.stream,
        summitID: this.summitID,
        mobile_no: this.newparticipant.mobile_no,
        alt_mobno: this.newparticipant.alt_mobno,
        q1_ans: this.newparticipant.q1_ans,
        q2_ans: this.newparticipant.q2_ans,
        q3_ans: this.newparticipant.q3_ans,
        q4_ans: this.newparticipant.q4_ans,
        team_name: this.newparticipant.team_name,
        member_names: this.names,
        member_emails: this.emails
      }).then(data => {
            console.log(data);
                if(data.data.success){
                  var formData = new FormData;
                  var file = $('#file')[0].files[0];
                  formData.append('uploadedFile', file);
                  this.$http.post('/api/uploads/' + data.data.id, formData, {

                    transformRequest: angular.identity,
                    headers: {
                      'Content-Type': undefined
                    }
                  }).then(response => {
                    if(response.data.success === false)
                    {
                      this.error = response.data.msg;
                      this.success = false;
                    }
                    else {
                      this.success = response.data.msg;
                      window.alert('That\'s all we need. You should receive a confirmatory email from us soon. \n In case you have any doubts or queries, please contact us at summitregistrations@shaastra.org');
                      window.location = '/';
                      this.error = false;
                    }
                    angular.element("input[name='file']").val(null);
                    angular.element("input[name='file_name']").val(null);
                  });
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
