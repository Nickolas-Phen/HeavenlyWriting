import * as examples from '../controllers/examples.server.controller.js'
import * as userController from '../controllers/userController.js'
import express from 'express'
const router = express.Router();
//import userSchema from "../models/userSchema.js";
// const examples = require('../controllers/examples.server.controller.js'),
//     express = require('express'),
//     router = express.Router()


//default route
router.get('/', examples.hello);

router.post('/', userController.create);

  
export default router;