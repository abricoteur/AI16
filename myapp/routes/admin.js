var express = require('express');
var router = express.Router();
var orgaRequest = require('../model/requestsCreateOrganisation.js')
var adminRequest = require('../model/request_role.js');
var orga = require('../model/organisations.js')
var user = require('../model/users.js')

router.get('/', function (req, res, next) {
    orgaRequest.readall(function(orgaRequest){
        adminRequest.readAllAdminRequest(function(adminRequest){
            res.render('admin', { title: 'Page admin', orgaRequest: orgaRequest, adminRequest: adminRequest});
        });
    });
});

router.post('/orgaRequestUpdateStatus', function(req, res, next) {
    var data = req.body;

    orgaRequest.updateStatus(data.request_id, data.status, function(){
        if(data.status == "accepted"){
            orga.create(data.siren, data.nom, data.email, data.type_organisation, data.siege_social, function(){
                user.updateRole(data.email, "recruteur", data.siren, function(){
                    res.redirect('/admin');
                })
            })
        }
    })
})

router.post('/adminRequestUpdateStatus', function(req, res, next) {
    var data = req.body;

    adminRequest.updateStatus(data.requester_email, data.requested_role, function(){
        
    })
})

module.exports = router;