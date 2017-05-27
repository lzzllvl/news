const request = require("request");
const cheerio = require("cheerio");
const Article = require('../models/Article.js');
const Comment = require('../models/Comment.js');

module.exports = function(router, db) {
  router.get('/scrape', function(req, res) {
    console.log("requesting onion")
    request('http://www.theonion.com/section/local/', function(err, response, html){
      const $ = cheerio.load(html);
      console.log("loaded html");
      $("h2.headline").each(function(i, element){
        console.log("iterating")
        let doc = {};
        doc.title = $(element).children('a').attr('title');
        doc.link = `http://www.theonion.com` //relative paths
                 + `${$(element).children('a').attr('href')}`;

        let newArticle = new Article(doc);
        newArticle.save((err, result) => {
          console.log('saving');
          err ? console.log(err):null;
        });
      });
    });
    res.redirect('/');
  });

  router.get('/', function(req, res) {
    Article.find().populate('comments', 'title body').exec(function(error, data) {
      if(!error) {
        res.json(data);
        //res.render('news', {data : data});
      } else {
        console.log(error);
        res.send(error);
      }
    });
  });

  router.post('/api/:articleName', function(req, res) {

  });

  router.delete('/api/:commentName', function(req, res) {

    res.redirect('/');
  });

}