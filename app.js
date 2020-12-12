const Handlebars = require('handlebars');
const path = require('path');
const express = require('express');
const hbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const {promisify} = require('util');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const methodOverride = require('method-override');
const moment = require('moment');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');
const csrf = require('csurf');

//Import env variables
require('dotenv').config({ path: './variables.env' });
require('./handlers/passport');

//Handlebars Template Helpers
const hbshelpers = require('handlebars-helpers');
const multihelpers = hbshelpers();


// main config
const app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view options', { layout: false });

app.engine('hbs', hbs ({
    extname: 'hbs',
    defaultView: 'main',
    helpers: {
      multihelpers
    },
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
  }));


Handlebars.registerHelper('formatDate', function(dateString) {
    return new Handlebars.SafeString(
        moment(dateString).format("MMM DD, YYYY").toUpperCase()
    );
});


// MIDDLEWARE
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator());

app.use(methodOverride());
app.use(cookieParser());
app.use(csrf({ cookie: true }));
app.use(session({
  secret: 'process.env.SECRET',
  key: 'process.env.KEY',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, maxAge: 60000 },
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  res.locals._csrf = req.csrfToken();
  next();
});

// promisify some callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

// app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

// passport config
const User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// mongoose
const mongoDB = process.env.DATABASE;
mongoose.set('useCreateIndex',true);
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// routes
const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// const inventoryRouter = require('./routes/inventory'); //Import routers for "inventory" area of site


app.use('/', indexRouter);
// app.use('/', indexRouter,inventoryRouter, usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server start on port: ${PORT}`));

module.exports = app;