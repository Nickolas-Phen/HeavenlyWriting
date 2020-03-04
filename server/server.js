import express from 'express'
import router from './routes/examples.server.routes.js'
 
// Use env port or default
mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => {
    console.log(`Successfully connected to mongoose database.`)
});

const port = process.env.PORT || 5000;

const app = express();
app.listen(port, () => console.log(`Server now running on port ${port}!`));
app.use('/', router, (req, res) => {

});
