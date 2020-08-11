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

var db = require("./models")

// Import routes and give the server access to them.
var routes = require("./routes/musicRoutes.js");

app.use(routes);

app.get('/', function (req, res) {
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
