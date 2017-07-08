'use strict';

import angular from 'angular';

export default angular.module('summitregistations2018App.constants', [])
  .constant('appConfig', require('../../server/config/environment/shared'))
  .name;
