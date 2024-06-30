const passport = require('passport');
require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleOneTapStrategy = require('passport-google-one-tap').GoogleOneTapStrategy;
const GitHubStrategy = require('passport-github2').Strategy;
const varmg = require("./varManagement.js");

let client_id;
let client_secret;

varmg.getOptions("USER_ID",function(res){
    console.log("i am in getOptions");
    passport.use(new GoogleStrategy({
        clientID: res.client_id,
        clientSecret: res.client_secret,
        callbackURL: "http://localhost:3000/google/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    ));
});

varmg.getOptions("GITHUB",function(res){
    console.log("i am in getOptions");
    passport.use(new GitHubStrategy({
        clientID: res.client_id,
        clientSecret: res.client_secret,
        callbackURL: "http://localhost:3000/github/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    ));
});

varmg.getOptions("ONETAP",function(res){
    console.log("i am in getOptions");
    passport.use(new GoogleOneTapStrategy({
        clientID: res.client_id,
        clientSecret: res.client_secret,
        callbackURL: "http://localhost:3000/google/callback"
        },
        function(accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    ));
});

// passport.use(new GoogleOneTapStrategy({
//     client_id: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET_ONETAP,
//     verifyCsrfToken: false,
//     },
//     function(profile, done){
//         return done(null, profile);
//     }
// ));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/google/callback"
//     },
//     function(accessToken, refreshToken, profile, done) {
//         return done(null, profile);
//     }
// ));

// passport.use(new GitHubStrategy({
//     clientID: process.env.CLIENT_ID_GITHUB,
//     clientSecret: process.env.CLIENT_SECRET_GITHUB,
//     callbackURL: "http://localhost:3000/github/callback"
//     },
//     function(accessToken, refreshToken, profile, done) {
//         return done(null, profile);
//     }
// ));