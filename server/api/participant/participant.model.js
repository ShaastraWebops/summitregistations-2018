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
  mem1_name: String,
  mem1_email: String,
  mem2_name: {type: String, required:false},
  mem2_email: {type: String, required:false},
  mem3_name: {type: String, required:false},
  mem3_email: {type: String, required:false},
  mem4_name: {type: String, required:false},
  mem4_email: {type: String, required:false},
  mem5_name: {type: String, required:false},
  mem5_email: {type: String, required:false},
});

registerEvents(ParticipantSchema);
export default mongoose.model('Participant', ParticipantSchema);
