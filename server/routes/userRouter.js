import * as user from '../controllers/userController.js'
import express from 'express'
const router = express.Router();
//import getMoonLoc from '../controllers/moonLocationController';
//need to import the js file to obtain moon location (not written)

//used for routing requests to correct req handler

//heavily based on bootcamp 3  

router.get('/', user.list);
router.post('/', /*getMoonLoc ,*/ user.create);

//route for sending signup info
router.post('/signup', user.create);

// ':' = url parameter
router.get('/:userId', user.read);
router.put('/:userId', /*getMoonLoc ,*/ user.update);
router.delete('/:userId', user.remove);

export default router;