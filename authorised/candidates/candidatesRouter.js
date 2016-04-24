var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());

// router.all('*' , function (req, res, next) {
//   if (!req.user)
//     res.status(401).send('Unauthorized');
//   else
//     next();
// });

router.get('/', function(req, res) {
    res.render(__dirname + '/index.ejs');
});

router.get('/candidatesController.js', function(req, res) {
    res.sendFile(__dirname + '/candidatesController.js');
});


router.use('/api', require('./candidatesApi.js'));

module.exports = router;
