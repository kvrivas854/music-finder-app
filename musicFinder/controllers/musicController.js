// var express = require("express");

// var router = express.Router();

// // Import the model (cat.js) to use its database functions.
// var db = require("../models")

// // Create all our routes and set up logic within those routes where required.
// router.get("/", function(req, res) {
//   db.all(function(data) {
//     var hbsObject = {
//       db: data
//     };
//     console.log(hbsObject);
//     res.render("index", hbsObject);
//   });
// });

// router.post("/api/song", function(req, res) {
//   db.create([
//     "name", "added"
//   ], [
//     req.body.name, req.body.added
//   ], function(result) {
//     // Send back the ID of the new quote
//     res.json({ id: result.insertId });
//   });
// });

// router.put("/api/playlist/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);

//   db.update({
//     added: req.body.added
//   }, condition, function(result) {
//     if (result.changedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// router.delete("/api/playlist/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   db.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// // Export routes for server.js to use.
// module.exports = router;
