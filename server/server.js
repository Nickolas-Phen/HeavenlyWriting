import express from 'express'
import userRouter from './routes/userRouter.js'
import readingRouter from "./routes/readingRouter.js";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config/config.js';
import * as swisseph from "./swissEph.js";

// Use env port or default

//add your db uri to config.js to test database on your computer, like in bootcamp 2, 3
mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => {
    console.log(`Successfully connected to mongoose database.`)
})

const port = process.env.PORT || 5000;

//initializes app
const app = express();

app.listen(port, () => console.log(`Server now running on port ${port}!`));


app.use(bodyParser.urlencoded({ //very important
    extended: false
}));
app.use(bodyParser.json());

app.use('/api/user', userRouter, (req, res) => {
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
    const birthPlace = req.query.birthPlace;
    const birthTime = req.query.birthTime
    //console.log("user: " + req.query.birthday);
    const data = swisseph.getAstrologyData(birthday, birthTime, birthPlace)
    //console.log(data);
    res.send(data)
});

app.all('*/', (req, res) => {
    res.send("Default response");
});

process.on('SIGINT', () => { console.log("Bye bye!"); process.exit(); })