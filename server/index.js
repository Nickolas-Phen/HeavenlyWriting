import express from 'express';
import path from 'path';
import cluster from 'cluster';
/*import numCPUs = require('os').cpus().length;*/
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import readingRouter from "./routes/readingRouter.js";
import bodyParser from 'body-parser';
import * as swisseph from "./swissEph.js";

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

/*// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  */

const __dirname = path.resolve();
  
mongoose.connect('mongodb+srv://user:test@cluster0-6wnxv.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => {
    console.log(`Successfully connected to mongoose database.`)
})

const app = express();

app.use(bodyParser.urlencoded({ //very important
    extended: false
}));
app.use(bodyParser.json());

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, './client/build')));

/*// Answer API requests.
app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});*/

app.use('/api/user', userRouter, (req, res) => {
    //console.log('test123');
//api for users
});

app.use('/api/reading', readingRouter, (req, res) =>
{
//api for readings made and updated by admin
});

app.use('/api/swiss/', async (req, res) =>
{
//api for swissEph
    const birthday = req.query.birthday;
    const birthPlace = req.query.placeOfBirth;
    const birthTime = req.query.birthTime;
    const data = await swisseph.getAstrologyData(birthday, birthTime, birthPlace);
    res.send(data)
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.listen(PORT, function () {
  console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
});
//}
