var express = require('express');
var bodyparser = require('body-parser');

var app = express();

app.use(bodyparser());

var tasksList, index = 0; 

app.post('/tasksList', function(req, res) {
  console.log('recieved tasksList: ', req.body);
  var body = req.body;
  tasksList = body;
  index = 0;
  res.sendStatus(200);
});

app.get('/tasksList', function(req, res) {
  console.log('sent tasksList: ', tasksList);
  res.json(tasksList);
});

app.get('/nextTask', function(req, res) {
  var payload = [];
  if(tasksList.length === index) {
    res.send('Empty');
  }
  else if(tasksList.length  === (index + 1)) {
    res.json([tasksList[index]]);
    index += 1;
  } else {
    console.log('sent task: ', tasksList[index]);
    res.json([tasksList[index], tasksList[index+1]]);
    index += 1;
  }
});

app.get('/reset', function(req, res) {
  console.log('reset data');
  tasksList = null;
  index = 0;
  res.send('Reset');
});

app.listen(3030);
