var express = require('express');
var router = express.Router();
var userModel = require('../model/users.js')
var orgaRequest = require('../model/requestsCreateOrganisation.js')
var adminRequest = require('../model/request_role.js');

router.get('/', function (req, res, next) {
    orgaRequest.readall(function(orgaRequest){
        adminRequest.readAllAdminRequest(function(adminRequest){
            res.render('admin', { title: 'Page admin', orgaRequest: orgaRequest, adminRequest: adminRequest});
        });
    });
});

module.exports = router;