var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.session.user.role)
  if (req.session && req.session.user) {
    var role = req.session.user.role;
    if (role == 'Administrateur') {
      return res.redirect('/admin');
    }
    else if (role == 'Candidat') {
      return res.redirect('/home');
    }
    else if (role == 'Recruteur') {
      return res.redirect('/recruiter');
    }
    else {
      return res.redirect('/users/logout');
    }
  } else return res.redirect('/users/connexion');
});

module.exports = router;
