//dependecies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;

const request = require("request");
const cheerio = require("cheerio");
// use bluebird promises - based on example
const Promise = require("bluebird");

mongoose.Promise = Promise;

const app = express();

//middleware
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

//templating engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



