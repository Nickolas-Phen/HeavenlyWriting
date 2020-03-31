'use strict';

import mongoose from 'mongoose';
import * as fs from 'fs';
import async from 'async';
import config from './config.js';
import Admin from '../models/adminSchema.js';


mongoose.connect(config.db.uri,{useNewUrlParser: true, useUnifiedTopology: true});

fs.readFile('admin_data.json', 'utf8', (err, data) => {
    if (err) 
        throw err;
    let adminData = JSON.parse(data);

    async.forEach(adminData.entries, (data, sent) => {
        Admin.create(data, (err) => {
            if (err) 
                throw err;
            sent();
        });
    },
        () => {
            mongoose.connection.close();
        });

    // adminData.entries.forEach(entry => {
    //     let currentData = new Admin(entry);
    //     currentData.save();
    //   });
      //mongoose.connection.close();
});

//  Admin.deleteMany({}, function(err, data) {
//        console.log("Dead that");
//      }); 
