var express = require("express");
// Set Handlebars.
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 8080;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));


// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");
var db = require("./models")

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./routes/musicRoutes.js");

app.use(routes);

app.get('/', function (req, res) {
  res.render('frontpage')
})

app.get('/frontpage', function (req, res) {
  res.render('frontpage')
})

app.get('/contact', function(req,res) {
  res.render('contact')
})

app.get('/search', function(req,res) {
  res.render('search')
})

app.get('/charts', function(req,res) {
  res.render('charts')
})

app.get('/songs', function(req, res) {
  db.Song.findAll({}).then(function(data) {
    console.log(data)
      var hbsObject = {
          songs: data.map(song => {return {name: song.name, added: song.added, id:song.id}})
      };
      res.render('songs', hbsObject);
  });
});

app.get('/album', function(req, res) {
  db.Album.findAll({}).then(function(data) {
      var hbsObject = {
        albums: data.map(album => {return {name: album.name, added: album.added, id:album.id}})
      };
      res.render('album', hbsObject);
  });
});

app.get('/artist', function(req, res) {
  db.Artist.findAll({}).then(function(data) {
      var hbsObject = {
        artists: data.map(artist => {return {name: artist.name, added: artist.added, id:artist.id}})
      };
      res.render('artist', hbsObject);
  });
});

app.get("/api/songs", function(req, res) {
  db.Song.findAll({}).then(function(dbSong) {
    res.json(dbSong);
  });
});

app.get("/api/artists", function(req, res) {
  db.Artist.findAll({}).then(function(dbArtist) {
    res.json(dbArtist);
  });
});

app.get("/api/albums", function(req, res) {
  db.Album.findAll({}).then(function(dbAlbum) {
    res.json(dbAlbum);
  });
});

app.post("/api/artists/", function(req, res) {
  db.Artist.create({
    name: req.body.name,
    added: req.body.added
  }).then(function(dbArtist) {
    res.json(dbArtist);
  })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/api/songs/", function(req, res) {
  db.Song.create({
    name: req.body.name,
    added: req.body.added
  }).then(function(dbSongPlaylist) {
    res.json(dbSongPlaylist);
  })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/api/albums/", function(req, res) {
  db.Album.create({
    name: req.body.name,
    added: req.body.added
  }).then(function(dbAlbum) {
    res.json(dbAlbum);
  })
    .catch(function(err) {
      res.json(err);
    });
});


app.post("/api/songs/:name", function(req, res) {
  db.Song.create({
    name: req.params.name,
    added: req.body.added
  }).then(function(dbSongPlaylist) {
    res.json(dbSongPlaylist);
  })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/api/artists/:name", function(req, res) {
  db.Artist.create({
    name: req.params.name,
    added: req.body.added
  }).then(function(dbArtist) {
    res.json(dbArtist);
  })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/api/albums/:name", function(req, res) {
  db.Album.create({
    name: req.params.name,
    added: req.body.added
  }).then(function(dbAlbum) {
    res.json(dbAlbum);
  })
    .catch(function(err) {
      res.json(err);
    });
});

// // Start our server so that it can begin listening to client requests.
// app.listen(PORT, function() {
//   // Log (server-side) when our server has started
//   console.log("Server listening on: http://localhost:" + PORT);
// });

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
