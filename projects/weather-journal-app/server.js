// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);
function listening() {
    console.log(`running on localhost: ${port}`);
};

// GET route
app.get('/all', (req, res) => {
    res.send(projectData);
});

// POST route
app.post('/base', (req, res) => {
    let newEntry = {
    'temp': req.body.temp,
    'userContent': req.body.userContent,
    'date': req.body.date
    }
    
    projectData.push(newEntry)
    res.send(projectData);
    console.log('appData: ', projectData);
});