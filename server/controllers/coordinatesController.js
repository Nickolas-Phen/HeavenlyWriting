/*

import config from '../config/config.js';
import request from 'request';

export default (req, res, next) => {
    if (req.body.address) {
        // This code replaces all whitespace and commas with the appropriate url-encoded replacement value.
        const addressTemp = req.body.address.toLowerCase().replace(/\s/g, "%20").replace(/,/g, "%2C");

        const options = {
            q: addressTemp,
            key: config.openCage.key,
        };

        // The below code makes a GET request to the specified URL.
        request({
            url: 'https://api.opencagedata.com/geocode/v1/json',
            qs: options
        }, async (error, response, body) => {
            if(error) 
            {
                res.status(404).send({
                    message: "Coordinates were not acquired."
                });
                return;
            }
            let parsedBody = JSON.parse(body);
            req.results = parsedBody.results[0].geometry;
            next();
        });
    } else {
        next();
    }
};  

*/