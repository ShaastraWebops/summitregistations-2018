'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://'+ process.env.SUMMITDEV_USER + ':' + process.env.SUMMITDEV_PASSWORD + '@localhost/summitregistations2018-dev'
  },

  // Seed database on startup
  seedDB: true

};
