var express = require('express');
var router = express.Router();
var userModel = require('../model/user.js')
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/userslist', function (req, res, next) {
    result=userModel.readall(function(result){
        res.render('usersList', { title: 'List des utilisateurs', users: result });
    });
});

module.exports = router;