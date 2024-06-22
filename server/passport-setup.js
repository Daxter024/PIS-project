const passport = require('passport');
require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleOneTapStrategy = require('passport-google-one-tap').GoogleOneTapStrategy;

passport.use(new GoogleOneTapStrategy({
    client_id: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET_ONETAP,
    verifyCsrfToken: false,
    },
    function(profile, done){
        return done(null, profile);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));