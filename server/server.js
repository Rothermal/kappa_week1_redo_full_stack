
var express = require('express');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var employees = require('./routes/employees');
var characters = require('./routes/characters');
var comic = require('./routes/comics');
var series = require('./routes/series');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use(express.static('server/public'));

app.use('/employees',employees);
app.use('/characters',characters);
app.use('/comic',comic);
app.use('/series',series);




app.use('/',index);

var server = app.listen(3000,function(){
    var port = server.address().port;
    console.log('now listening on port : ', port);
});


