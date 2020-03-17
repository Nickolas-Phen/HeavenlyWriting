import * as user from '../controllers/userController.js'
import express from 'express'
const userRouter = express.Router();
//import getMoonLoc from '../../client/src/api/getMoonData.js';
//need to import the js file to obtain moon location (not written)

//used for routing requests to correct req handler

//heavily based on bootcamp 3  

//userRouter.get('/', getMoonLoc, user.list);
userRouter.post('/', /*getMoonLoc ,*/ user.create);

//route for sending signup info
userRouter.post('/signup', user.create);

// ':' = url parameter
userRouter.get('/:userId', user.read);
userRouter.put('/:userId', /*getMoonLoc ,*/ user.update);
userRouter.delete('/:userId', user.remove);

export default userRouter;