console.log("Started");

// import node, express, path
const express = require('express');
const path = require('path');
const app = express();

// import database API functions
const { accessDB } = require('./databaseAPI');

// Configure network constants
const hostname = '127.0.0.1';
const PORT = 3000;

app.use(express.static( path.join( __dirname, '/client/build')));
app.use(express.json())

// get external users
app.get('/api/external-users', async (req,res) => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => res.json(json))

});

// serve index.html to any extension except for above
app.get( '/*', (req, res) => {
    console.log("got request")
    res.sendFile(path.join(__dirname, '/react-app/build', 'index.html'))
});

// Open up server on port PORT
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});


accessDB();