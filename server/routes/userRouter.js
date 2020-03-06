import * as user from '../controllers/userController.js'
import express from 'express'
const router = express.Router();
//import getMoonLoc from '../controllers/moonLocationController';
//need to import the js file to obtain moon location (not written)

//used for routing requests to correct req handler

//heavily based on bootcamp 3  

userRouter.get('/', user.list);
userRouter.post('/', /*getMoonLoc ,*/ user.create);

// ':' = url parameter
userRouter.get('/:userId', user.read);
userRouter.put('/:userId', /*getMoonLoc ,*/ user.update);
userRouter.delete('/:userId', user.remove);

export default userRouter;