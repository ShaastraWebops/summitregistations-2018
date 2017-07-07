'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './upload.events';

var UploadSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(UploadSchema);
export default mongoose.model('Upload', UploadSchema);
