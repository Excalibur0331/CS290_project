/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Liheng Yi
 * Email: yili@oreognstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var postData = require('./postData.json');

var app = express();
var port = process.env.PORT || 3000;
var peopleData = require('./postData.json');
const { nextTick } = require('process');

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'));

app.get("/", function (req,res, next){
  if(postData){
    res.status(200).render('mainPage',{
      posts: postData,
      showFilter: true,
      showModal: true
    })
  }
  else {
    next();
  }
});
// single post
app.get("/post/:postIndex", function(req,res,next){
  var thePost = parseInt(req.params.postIndex)
  var singlePost = postData[thePost]
  if (thePost > -1 && thePost < postData.length){                                                                                                                                     t = thePost
    res.status(200).render('mainPage',{
      posts: [singlePost],
      showFilter: false,
      showModal: false
    });
  }else{
    next();
  }
});
// home page
app.get('*', function (req, res,next){
  res.status(404).render('404',{
    // no keys
  });
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
