import * as reading from '../controllers/readingController.js'
import express from 'express'
const readingRouter = express.Router();

//route for creating new reading
readingRouter.post('/', reading.create);
//to get one 
readingRouter.get('/prediction', reading.findByUniqueCombo);
// ':' = url parameter
readingRouter.get('/', reading.list);//returns all readings in database
readingRouter.put('/:userId', reading.update);
readingRouter.delete('/:userId', reading.remove);

export default readingRouter;