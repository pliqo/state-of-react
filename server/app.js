// server/app.js
const express = require('express');
//const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();

// Setup logger with Morgan
//app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Here we're going to get the json showcase file
var showcaseFilePath = path.resolve(__dirname, '..', 'showcase.json');
var showcaseObj;
fs.readFile(showcaseFilePath, 'utf8', function (err, data) {
  if (err) throw err; // we'll not consider error handling for now
  showcaseObj = JSON.parse(data);
})

// Get all the showcase items
app.get('/api/showcase', (req, res) => {
    var showcase = showcaseObj;
    if(req.query.sort == 'dateasc') {
      showcase.sort(function(a, b) {
        var dateA = new Date(a.created_at)
        var dateB = new Date(b.created_at);
        return dateA-dateB //sort by date descending
      });
    } else if(req.query.sort == 'nameasc') {
       showcase.sort(function(a, b) {
        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
        if (nameA < nameB) //sort string ascending
            return -1 
        if (nameA > nameB)
            return 1
        return 0 //default return value (no sorting)
       });
    } else if(req.query.sort == 'namedesc') {
       showcase.sort(function(a, b) {
        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
        if (nameA < nameB) 
            return 1 
        if (nameA > nameB) //sort string descending
            return -1
        return 0 //default return value (no sorting)
       });
    } else {
      showcase.sort(function(a, b) {
        var dateA = new Date(a.created_at)
        var dateB = new Date(b.created_at);
        return dateB-dateA //sort by date descending
      });
    }

    res.json(showcase);
});

// TBD
// Get all the showcase items in chunks for pagination
app.get('/api/showcase/page:id', (req, res) => {
    res.json(showcaseObj);
});

// Get a randon showcase item
app.get('/api/rnd', (req, res) => { 
  var showcase = showcaseObj;
  var id = Math.floor(Math.random() * showcase.length);
  var r = showcase[id];
  res.json(r);
});

// Get the matching item by id
app.get('/api/:id', (req, res) => {
  var showcase = showcaseObj;
  if(showcase.length < req.params.id || req.params.id <= 0) {
    res.statusCode = 404;
    return res.send('Error 404: No item found');
  } 
  var r = showcase.filter(r => {
    if(r.id == req.params.id) {      
      return r;
    }
  });
  res.json(r[0]); // don't ask me, but client-side fetch likes it more!
});

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router renders the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;