import * as examples from '../controllers/examples.server.controller.js'
import express from 'express'
const router = express.Router();
// const examples = require('../controllers/examples.server.controller.js'),
//     express = require('express'),
//     router = express.Router()

router.get('/', examples.hello);
  
export default router;