'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './participant.events';

var ParticipantSchema = new mongoose.Schema({
  insti: String,
  stream: String,
  mobile_no: String,
  alt_mobno: {type: String, required:false, default: "Not Provided"},
  q1_ans: {type: String, required:false, default: "Not Provided"},
  q2_ans: {type: String, required:false, default: "Not Provided"},
  resume: {type: String},
  team_name: String,
  member_names:[String],
  member_emails:[String]
  });

registerEvents(ParticipantSchema);
export default mongoose.model('Participant', ParticipantSchema);
