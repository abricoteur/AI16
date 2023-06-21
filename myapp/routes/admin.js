var express = require('express');
var router = express.Router();
var userModel = require('../model/users.js')
var orgaRequest = require('../model/requestsCreateOrganisation.js')
var adminRequest = require('../model/request_role.js');

router.get('/', function (req, res, next) {
    var trie1 = req.query.trie1 || 'recent';
    var trie2 = req.query.trie2 || 'recent';
    orgaRequest.readall(trie1, function (orgaRequest) {
        adminRequest.readAllAdminRequest(trie2, function (adminRequest) {
            res.render('admin', { title: 'Page admin', orgaRequest: orgaRequest, adminRequest: adminRequest });
        });
    });
});

module.exports = router;