const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/User');
// const LocalStrategy = require('passport-local').Strategy;

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// passport.serializeUser(function(user, done){
//     done(null, user.id);
// });

// passport.deserializeUser(function(user, done){
//     User.findById(id, function(err, user){
//         done(err, done);
//     });
// });

// passport.use('local.register', new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password',
//     passReqToCallback: true,
// }, function(req, email, password, done){
//     User.findOne({'email':email, function(err,user){
//         if (err) {
//             return done(err);
//         }
//         if (user) {
//             return done(null, false, {message: 'Email is already in use!!!'});
//         }
//         let newUser = new User();
//         newUser.email = email;
//         newUser.password = password;
//     }});
// }));