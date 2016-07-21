//web engine
var express = require('express');
var bodyParser = require('body-parser');
var app = module.exports = express();
app.use(bodyParser.json());
app.set('view engine', 'ejs');

//db
var mongoose = require('mongoose');
mongoose.connect('mongodb://iwWebApp:iw12345678@ds019970.mlab.com:19970/intelligentways');


//routes
app.get('/', function (req, res) { res.sendFile(__dirname + '/public/index.html'); });
app.get('/admin', function (req, res) {res.render(__dirname + '/authorised/admin/index.ejs', { user : 'John Wayne'});})
app.get('/admin/index.js', function (req, res) {res.sendFile(__dirname + '/authorised/admin/index.js')})

//routers
app.use('/registrationForm', require('./public/registrationForm/registrationFormRouter.js'));
app.use('/candidates', require('./authorised/candidates/candidatesRouter.js'));
app.use('/api/talent', require('./api/talent.js'));




//start
var port = process.argv[2];
if (port == null) { port = 80;}
app.listen(port, function () { console.log('Listening on port ' + port); });
