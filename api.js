const request = require('request');
const http = require('http');
const fs = require('fs');
const LocationModel = require('./model');

module.exports = function (app) {

    app.get('/', (req, res) => {

        LocationModel.findAll().then((locations) => {
            locations.every(location => location instanceof LocationModel);
            res.status = 200;
            res.render('data', { locations });
        }).catch((err) => {
            res.status = 500;
            res.json(err.message);
        });

    });

    app.get('/addLocation', (req, res) => {
        res.render('add-location');
    });

    app.post('/getZipcodeDetails', (req, res) => {
        const zipcode = req.body.zipcode;

        const options = {
            method: 'GET',
            url: `http://lms.labyrinthelab.com/api/ws_get_zipcode_details.php?zipcode=${zipcode}`,
            headers: {
                access_token: 'ZiPcoDeDetAiLs'
            }
        };

        request(options, (err, response, body) => {
            body = JSON.parse(body);
            if (body.CODE === 'WS200') {

                // 
                const originalFileUrl = body.RESPONSE_DATA.file_url;
                const [, , fileUrl] = originalFileUrl.match(/(https|http)(.*)/); //for checking if file url using https protocol
                const newFileUrl = fileUrl ? `http${fileUrl}` : ''; //replace protocol as http
                const [, filename] = originalFileUrl.match(/.*\/(.*)$/); //get target file name

                const fileDest = `public/documents/${filename}`;
                const file = fs.createWriteStream(fileDest);

                http.get(newFileUrl, (result) => {
                    result.pipe(file);
                });
                //

                const locationData = body.RESPONSE_DATA;
                locationData.filename = filename;
                LocationModel.create(locationData).then((doc) => {
                    res.status = 200;
                    res.redirect('/');
                }).catch((err) => {
                    res.status = 500;
                    res.json(err.message);
                })

            } else {
                res.end(body.MESSAGE);
            }
        });
    });

}