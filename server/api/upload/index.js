'use strict';

import {Router} from 'express';
import * as controller from './upload.controller';
import * as auth from '../../auth/auth.service';


var router = new Router();

router.post('/:id', controller.uploadFile);

module.exports = router;
