//dependecies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');

const PORT = process.env.PORT || 8080;

// use bluebird promises - based on example
const Promise = require("bluebird");

mongoose.Promise = Promise;

const app = express();

//middleware
app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

//templating engine
app.engine("handlebars", exphbs({ defaultLayout: "index" }));
app.set("view engine", "handlebars");

// Database configuration with mongoose
mongoose.connect("mongodb://heroku_v6502kk2:fi7c31gvelk9om2uqfdl1lj7qo@ds155201.mlab.com:55201/heroku_v6502kk2");
var db = mongoose.connection;
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


//routes
const router = express.Router();
require('./routes/userroutes.js')(router, db);

app.use('/', router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
})
