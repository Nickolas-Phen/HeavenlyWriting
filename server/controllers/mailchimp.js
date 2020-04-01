/*

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
const Mailchimp = require('mailchimp-api-v3');
const mailchimp = new Mailchimp(api_key);
const request = require('superagent');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));


var mailchimpInstance   = 'us19',
    listUniqueId        = 'de644ad1de',
    mailchimpApiKey     = '31d36951a5db54c9db20da653fb109b3-us19';


cont [selectedUser,setUser] =useState('');
const SignUp = (props) => {
    const addUser = (e) => {
    

      request
      .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
      .set('Content-Type', 'application/json;charset=utf-8')
      .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
      .send({
        'email_address': e.body.email,
        'status': 'pending',
        'merge_fields': {
          'FNAME': e.body.firstName,
          'LNAME': e.body.lastName
        }
      })
          .end(function(err, response) {
            if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
              res.send('Signed Up!');
            } else {
              res.send('Sign Up Failed :(');
            }
        });
        
    }
}

export default SignUp;

app.post('signUp', (req, res) =>
{
  request
        .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
        .set('Content-Type', 'application/json;charset=utf-8')
        .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
        .send({
          'email_address': req.body.email,
          'status': 'subscribed',
          'merge_fields': {
            'FNAME': req.body.firstName,
            'LNAME': req.body.lastName
          }
        })
            .end(function(err, response) {
              if (response.status < 300 || (response.status === 400 && response.body.title === "Member Exists")) {
                res.send('Signed Up!');
              } else {
                res.send('Sign Up Failed :(');
              }
          });
});

// Signup Route
/*
app.post('/signup', (req, res) => {
  const { firstName, lastName, email } = req.body;

  // Make sure fields are filled
  if (!firstName || !lastName || !email) {
    res.redirect('/fail.html');
    return;
  }
  
});

  // Construct req data
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const postData = JSON.stringify(data);

  const options = {
    url: 'https://<DC>.api.mailchimp.com/3.0/lists/<YOUR_LIST_ID>',
    method: 'POST',
    headers: {
      Authorization: 'auth <YOUR_API_KEY>'
    },
    body: postData
  };

  */