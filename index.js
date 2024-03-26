const fs = require('fs');
const express = require('express');
const app = express();
const model = require('./server/model.js');

const PORT = process.env.PORT || 3000;
// If PORT environment is not defined, use 3000 as default port

app.use(express.static(__dirname + "/"));
let system = new model.System();

app.get('/', function(req, res) {
    var content = fs.readFileSync(__dirname + '/client/index.html');
    res.set('Content-type', 'text/html');
    res.send(content);
});

// API endpoints

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