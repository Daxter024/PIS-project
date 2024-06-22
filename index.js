const fs = require('fs');
const express = require('express');
const app = express();
const model = require('./server/model.js');
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./server/passport-setup.js");
require('dotenv').config();

const PORT = process.env.PORT || 3000;
// If PORT environment is not defined, use 3000 as default port

app.use(express.static(__dirname + "/"));
let system = new model.System();


app.use(cookieSession({
    name: "System",
    keys: ["key1", "key2"]
}));

app.use(passport.initialize());
app.use(passport.session());

// API endpoints

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failure' }), function(req, res) {
    // res.redirect('/home');
    res.redirect('/good')
});

app.get('/failure', function(req, res) {
    // res.send({nick:"nook"});
    res.redirect('/');
});

app.get('/good', function(req, res) {
    let nick = req.user.emails[0].value;
    if(nick){
        system.addUser(nick);
    }
    res.cookie("nick", nick);
    // res.storage.setItem("nick",nick);
    // res.redirect('/home');
    res.redirect('/');
});


app.get('/', function(req, res) {
    var content = fs.readFileSync(__dirname + '/client/index.html');
    res.set('Content-type', 'text/html');
    res.send(content);
});

app.get('/addUser/:nick',function(req,res){
    // Should be a post request but i need to check it with postman
    let nick = req.params.nick;
    let result = system.addUser(nick);
    res.send(result);
});

app.get('/getUsers',function(req,res){
    let result = system.getUsers();
    res.send(result);
});

app.get('/activeUser/:nick',function(req,res){
    let nick = req.params.nick;
    let result = system.activeUser(nick);
    res.send(result);
});

app.get('/numberUsers',function(req,res){
    let result = system.numberUsers();
    res.send(result);
});

// delete
app.get('/deleteUser/:nick',function(req,res){
    let nick = req.params.nick;
    let result = system.deleteUser(nick);
    res.send(result);
});

app.listen(PORT, function() {
    console.log('Listening on port '+ PORT + '...');
    console.log('Press Ctrl+C to quit.');
});