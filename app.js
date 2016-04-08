//setup web app
var express = require('express');
var app = module.exports = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

//db
var mongoose = require('mongoose');
mongoose.connect('mongodb://iwWebApp:iw12345678@ds019970.mlab.com:19970/intelligentways');

//routes
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/api/user', function(req, res) {
  console.log("post");
  var User = require('./models/User.js');
  var newUser = new User();

  //copy props by name
  for(var k in req.body) newUser[k]=req.body[k];

  newUser.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    else {
      console.log("New user saved: " + newUser);
      res.send(newUser);
    }
  });

});



//start web app
var port = process.argv[2];
if (port == null) {
    port = 80;
}
app.listen(port, function () {
  console.log('Listening on port ' + port);
});
