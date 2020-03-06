import express from 'express'
import router from './routes/examples.server.routes.js'
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config/config.js';
 
// Use env port or default
const port = process.env.PORT || 5000;

mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => {
    console.log(`Successfully connected to mongoose database.`)
});

const app = express();
app.listen(port, () => console.log(`Server now running on port ${port}!`));

app.use(bodyParser.urlencoded({ //very important
    extended: false
}));
app.use(bodyParser.json());

app.use('/api/signup', router, (req, res) => {

});

app.all('*/', (req, res) => {
    res.send("Default response")
});
