// Imports
var express = require('express');
var router = express.Router();
var request = require('request');

var db = require('../models');

// GET route which calls uses Sequelize's findAll method.
router.get('/', function(req, res) {
    db.Artist.findAll({
        order: 'artist_name ASC'

    }).then(function(data) {
        var hbsObject = {
            artists: data
        };
        res.render('index', hbsObject);
    });
});

router.get('/song', function(req, res) {
    db.Song.findAll({
        order: 'song_name DESC'

    }).then(function(data) {
        var hbsObject = {
            songs: data
        };
        res.render('index', hbsObject);
    });
});

router.get('/album', function(req, res) {
    db.Album.findAll({
        order: 'album_name DESC'

    }).then(function(data) {
        var hbsObject = {
            albums: data
        };
        res.render('index', hbsObject);
    });
});


router.post('/api/new/artist', function(req, res) {

    var artistName = req.body.name;

    var queryUrl = "https://deezerdevs-deezer.p.rapidapi.com/search&q=" + artistName;

    request(queryUrl, function(error, response, body) {


        if (!error && JSON.parse(body).Response !== 'False') {
            console.log(JSON.parse(body));

            var name = JSON.parse(body).artist.name;

            console.log(name);

            var artist = "";

            var options = {
                method: 'GET',
                url: 'https://deezerdevs-deezer.p.rapidapi.com/search' + name,
                qs: {
                    language: 'en-US',
                    api_key: '778af56556msh60df0212f929a25p1bd6fajsn95b39208364f'
                },
                body: '{}'
            };

            request(options, function(error, response, result) {

                if (error) res.redirect('/');
                if (!JSON.parse(result).results) {
    
                    res.redirect('/')
                } else {
                    artist = JSON.parse(result).results[0].key;
                    console.log(artist);
                    db.Artist.create({
                        artist_name: JSON.parse(body).artist.name,
                    }).then(function() {
                        res.redirect('/');
                    });

                }
            });

        } else {
            console.log("\nOops...something went wrong with you musical search. Try again...");
            res.redirect('/');
        }
    });
});

/////////////////////////////////////////////////////////////////////
router.put('/api/new/artist/:id', function(req, res) {

    var added = true;
    var ID = req.params.id;

    db.Artist.update({
        added: added,

    }, { where: { id: ID } }).then(function() {
        res.redirect('/');
    });
});


module.exports = router;