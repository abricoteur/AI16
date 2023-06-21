var createError = require('http-errors');
var express = require('express');
var path = require('path');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
var logger = require('morgan');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Les fichiers seront sauvegardés dans le dossier 'uploads'

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var profilRouter = require('./routes/profil');
var applicationManageRouter = require('./routes/application_management');
var homeRouter = require('./routes/home');
var offersFormRouter = require('./routes/offers_form');
var offersManageRouter = require('./routes/offers_management');
var orgFormRouter = require('./routes/organization_form');
var orgManageRouter = require('./routes/organization_management');
var recruiterRouter = require('./routes/recruiter');
var userManageRouter = require('./routes/user_management');
var candidatureManageRouter = require('./routes/candidature');
var offersDetailsManageRouter = require('./routes/offers_details');
var requestRoleRouter = require('./routes/request_role');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const deuxHeures = 1000 * 60 * 60 * 2;

app.use(sessions({
  secret: "votre secret ici hdhhdhhshshshsh",
  saveUninitialized: true,
  cookie: { maxAge: deuxHeures },
  resave: false
}));
// cookie parser middleware
app.use(cookieParser());

// Middleware for checking if a user is connected
function isConnected(session, role) {
  // Check if session exists and user role matches
  return session && session.user && session.user.role === role;
}

// check user
app.all("*", function (req, res, next) {
  const roles = ["Administrateur", "Candidat", "Recruteur"]
  const nonSecurePaths = ["/", "/js/*", "/img/job-promotion.png", "/favicon.ico", "/stylesheets/*", "/users/checkUser", "/users/nvUser", "/users/connexion", "/users/register", "/users/", "/users/logout/"];
  const adminPaths = ["/admin", "/organization_management", "/user_management", "/organization_management/update", "/organization_management/delete", "/users/userslist", "/users/update", "/users/delete"]; //list des urls admin
  const candidatPaths = ["/home", "/organization_form", "/candidature", "/candidature/postuler", "/organization_form/request", "/offers_details", "/candidature/delete"]; //list des urls candidats
  const recruteurPaths = ["/recruiter", "/offers_management", "/application_management", "/offers_form", "/offers_form/request"]; //list des urls recruter
  const commonPaths = ["/profil", "/profil/update", "/request_role/recruteur", "/request_role/admin"]


  if (nonSecurePaths.includes(req.path)) return next();

  if (!(req.session && req.session.user && req.session.user.role && roles.includes(req.session.user.role))) { return res.redirect("/users/connexion") };
  //authenticate user
  if (commonPaths.includes(req.path)) {
    return next()
  }
  if (adminPaths.includes(req.path)) {
    if (isConnected(req.session, "Administrateur")) return next();
    else res.status(403).render("error", { message: " Unauthorized access", error: {} });
  }
  else if (candidatPaths.includes(req.path)) {
    if (isConnected(req.session, "Candidat")) return next();
    else res.status(403).render("error", { message: " Unauthorized access", error: {} });
  }
  else if (recruteurPaths.includes(req.path)) {
    if (isConnected(req.session, "Recruteur")) return next();
    else res.status(403).render("error", { message: " Unauthorized access", error: {} });
  } else {
    res.redirect("/users/connexion");
  }
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/profil', profilRouter);
app.use('/application_management', applicationManageRouter);
app.use('/home', homeRouter);
app.use('/offers_form', offersFormRouter);
app.use('/offers_management', offersManageRouter);
app.use('/organization_form', orgFormRouter);
app.use('/organization_management', orgManageRouter);
app.use('/recruiter', recruiterRouter);
app.use('/user_management', userManageRouter);
app.use('/candidature', candidatureManageRouter);
app.use('/request_role', requestRoleRouter);
app.use('/offers_details', offersDetailsManageRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
