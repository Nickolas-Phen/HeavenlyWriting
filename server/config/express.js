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

    //don't really know if needed? added it just in case, though possible errors might occur
    app.use(express.json());

    // body parsing middleware
    app.use(bodyParser.json());

    // add a router
    app.use('/api/example', exampleRouter);

    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    }

    //creates new subscribers 
    app.post('/signUp',(req,res)=>{
        //Possible to get from other places?
        const {email,firstName,lastName,address,phoneNumber,birthday}=req.body;

        //constructs data for mailchimp subscriber
        const data={
            members:[
                {
                    email_address: email,
                    status: 'subscribed',
                    merge_fields:{
                        FNAME: firstName,
                        LNAME: lastName,
                        ADDRESS: address,
                        PHONE: phoneNumber,
                        BIRTHDAY: birthday
                    }
                }
            ]
        }
        const postData=JSON.stringify(data);

        //creates mailchimp subscriber 
        const options ={
            url: 'https://us19.api.mailchimp.com/3.0/lists/363ae36a99',
            method: 'POST',
            headers:{
                Authorization: 'auth e6ed8d7427300d00fe7bb3d0eee6fed3-us19'
            },
            body: postData
        }

        //validation if email was entered 
        if(email){
            request(opttions,(err,response,body)=>{
                if(err){
                    res.json({error: err});
                }
                /*else{     if we need to check if javascript is running or not
                    if(js)
                        res.sendStatus(200);
                    else
                        res.redirect(success page);
                }*/
            })
        }
        else{
            res.status(404).send({message: 'Failed to subscribe'});
        }
    })
    



    return app
}

