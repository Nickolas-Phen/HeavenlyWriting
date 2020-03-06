import express from 'express'
import router from './routes/examples.server.routes.js'
import mongoose from 'mongoose'; 

import User from "./models/userSchema";


// Use env port or default
const port = process.env.PORT || 5000;

const app = express();
app.listen(port, () => console.log(`Server now running on port ${port}!`));
app.use('/', router, (req, res) => {

});
