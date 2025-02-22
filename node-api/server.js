// import node, express, path
const express = require('express');
const path = require('path');
const app = express();

// import database API functions
const { saveUsers } = require('./databaseAPI');
const { fetchUsers } = require('./databaseAPI');

// Configure network constants
const PORT = 3000;

app.use(express.static( path.join( __dirname, '/client/build')));
app.use(express.json())

//API Endpoints
// get external users
app.get('/api/external-users', async (req,res) => {
    console.log("[Server] Get External Users request recieved.")
    try {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => res.json(json))
        console.log("[Server] External users retrieved successfully.")
    } catch (error) {
        console.error("[Server] ERROR getting external users: ", error )
    }
});
// save users
app.post('/api/save-users', async (req,res) => {
    console.log("[Server] Save request recieved");
    // call database API to save data
    saveUsers( req.body );
})

// fetch users
app.get('/api/fetch-users', async (req,res) => {
    console.log("[Server] Fetch users request recieved.");
    // call databaseAPI to retrieve data
    const returnData = await fetchUsers();
    // respond with data back to frontend
        // check for error code
    if( returnData == -1 ) {
        //Error or no data found, return error
        console.log("[Server] Unable to get users from database. " +
            "Returning no data found code.");
        res.json({ "error": "-1" });
    } else {
        // data found, return
        console.log("[Server] Users fetched successfully. Returning data.");;
        res.json(returnData);
    }
});
// Open up server on port PORT
app.listen(PORT, () => {
    console.log('[Server] Server is running on port ' + PORT);
});