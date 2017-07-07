'use strict';

import jsonpatch from 'fast-json-patch';
import multer from 'multer';
import Participant from '../participant/participant.model';

var saveWithName = "Noname";
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'client/assets/uploads')
  },
  filename: function(req, file, cb) {

    saveWithName = file.fieldname + '-' + Date.now() + "." + file.originalname.split('.').pop();
    cb(null, saveWithName)
  }
});

var upload = multer({storage: storage}).single('uploadedFile');

export function uploadFile(req, res) {
  var participant =  req.params.id;
  upload(req, res, err => {

    if (err) {

      return res.json({success: false,  msg: "Error while uploading file", name: 'no file was uploaded'});
    }
    Participant.findOne({_id: participant},function(err,participant){
      console.log(Participant);
      if(err) throw err;
      participant.resume = saveWithName;
      participant.save(function(err){
        if(err) throw err;
        res.json({success: true, msg: "File Uploaded!"});
      });
    });
  });
}
