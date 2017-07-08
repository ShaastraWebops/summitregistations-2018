'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './participant.events';

var ParticipantSchema = new mongoose.Schema({
  name: String,
  insti: String,
  stream: String,
  mobile_no: String,
  alt_mobno: {type: String, required:false},
  email: String,
  resumeurl: {type: String, required: false},
  q1_ans: {type: String, required:false},
  q2_ans: {type: String, required:false},
  resume: {type: String},
  team_name: String,
  members:[{name:String,email:String}]
  });

registerEvents(ParticipantSchema);
export default mongoose.model('Participant', ParticipantSchema);
