var express = require('express');
var router = express.Router();
var users = require('../model/users.js')

router.get('/', function (req, res, next) {

    result=users.readall(function(result){
        res.render('user_management', { title: 'Page admin', users: result});
    });

});

router.post('/update', function (req, res, next) {

    var data = req.body;
    users.update(data.email, data.nom, data.prenom, data.tel, data.role, function(){

    })

    result=users.readall(function(result){
        res.render('user_management', { title: 'Page admin', users: result});
    })
})

router.get('/userslist', function (req, res, next) {
    result = userModel.readall(function (result) {
        res.render('usersList', { title: 'List des utilisateurs', users: result });
    });
});

module.exports = router;