import * as predictions from '../controllers/predictionsRouter.js'
import express from 'express'
const predictionsRouter = express.Router();

//route for creating new reading
predictionsRouter.post('/', predictions.create);
predictionsRouter.get('/', predictions.list);
predictionsRouter.put('/:userId', predictions.update);
predictionsRouter.delete('/:userId', predictions.remove);

export default predictionsRouter;