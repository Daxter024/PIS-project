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

app.listen(PORT, function() {
    console.log('Listening on port '+ PORT + '...');
    console.log('Press Ctrl+C to quit.');
});