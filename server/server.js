import express from 'express'
import router from './routes/examples.server.routes.js'
import mongoose from 'mongoose'; 

import User from "./models/userSchema";


// Use env port or default
const port = process.env.PORT || 5000;

//initializes app
const app = express();

app.listen(port, () => console.log(`Server now running on port ${port}!`));

app.use('/', router, (req, res) => {

});

//need to create request handler for api (moon location)
app.post('', /*middleware, */ (req, res) =>
{

});

//supposed to send user to homepage if there is no specification
app.all('/*', (req, res) => 
{
    res.sendFile(path.resolve('client/public/', 'index.html'));
})
