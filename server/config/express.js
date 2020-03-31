const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    request=require('request'),
    bodyParser = require('body-parser'),
    exampleRouter = require('../routes/examples.server.routes');



module.exports.init = () => {
    /* 
        connect to database
        - reference README for db uri
    */
    mongoose.connect(process.env.DB_URI || require('./config').db.uri, {
        useNewUrlParser: true
    });
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

    // initialize app
    const app = express();

    // enable request logging for development debugging
    app.use(morgan('dev'));
    
    //added
    //don't really know if needed? added it just in case, though possible errors might occur
    app.use(express.json());

    //don't really know if needed? added it just in case, though possible errors might occur
    app.use(express.json());

    // body parsing middleware
    app.use(bodyParser.json());

    // app.use(bodyParser.urlencoded({ //very important
    //     extended: true
    // }));

    // add a router
    app.use('/api/example', exampleRouter);

    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, 'client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    }
    app.use(express.static(path.join('../../client/src/components/Signup.js')));
     
    app.post('/signup',(req,res)=>{
    })

   // return app
}

