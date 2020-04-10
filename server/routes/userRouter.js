import * as user from '../controllers/userController.js'
import express from 'express'
const userRouter = express.Router();
import * as authHelper from '../authHelperFunctions.js'
import getCoordinates from '../controllers/coordinatesController.js';
//import getMoonLoc from '../../client/src/api/getMoonData.js';
//need to import the js file to obtain moon location (not written)

//used for routing requests to correct req handler

//heavily based on bootcamp 3

//userRouter.get('/', getMoonLoc, user.list);

//route for sending signup inf
//userRouter.post('/signup', user.create);

//copy and pasted from authentication tutorial
//userRouter.post('/', user.create);
userRouter.post('/authenticate', user.authenticate);
//userRouter.route('/:id').get(user.show).patch(user.update).delete(user.remove);

// ':' = url parameter
userRouter.get('/id/:userId', user.read);
userRouter.get('/email/:email', user.findByEmail);
userRouter.put('/:userId', /*getMoonLoc ,*/ user.update);
userRouter.delete('/:userId', user.remove);
userRouter.use(authHelper.verifyToken);//make sure this middleware is after the others

export default userRouter;