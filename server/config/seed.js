/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import participant from '../api/participant/participant.model';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(config.seedDB) {
    User.find({}).remove()
      .then(() => {
        User.create({
          provider: 'local',
          role: 'admin',
          name: 'Vishnu Harshith',
          email: 'vishnu.harshith99@gmail.com',
          password: '#1111111'
        }, {
          provider: 'local',
          role: 'admin',
          name: 'Advaith Sridhar',
          email: 'advaithsridhar08@gmail.com',
          password: '#1111111'
        },
        {
          provider: 'local',
          role: 'admin',
          name: 'Vamsi Mula',
          email: 'vamsikrishna@shaastra.org',
          password: '#1111111'
        },
        {
          provider: 'local',
          role: 'admin',
          name: 'Kaushik Gattupalli',
          email: 'gv@shaastra.org',
          password: '#1111111'
        },
        {
          provider: 'local',
          role: 'admin',
          name: 'Gokulan',
          email: 'kulan@shaastra.org',
          password: '#1111111'
        })
        .then(() => console.log('finished populating users'))
        .catch(err => console.log('error populating users', err));
      });
  }
}
