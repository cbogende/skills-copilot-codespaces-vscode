// Create web server
// 1. Load express module
// 2. Create an express app
// 3. Create a route for GET request
// 4. Create a route for POST request
// 5. Start the web server

// 1. Load express module
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// 2. Create an express app
const app = express();

// 3. Create a route for GET request
app.get('/comments', (req, res) => {
  fs.readFile('comments.json', (error, data) => {
    if (error) {
      res.send('Error reading file');
    } else {
      res.send(data);
    }
  });
});

// 4. Create a route for POST request
app.use(bodyParser.json());
app.post('/comments', (req, res) => {
  fs.readFile('comments.json', (error, data) => {
    if (error) {
      res.send('Error reading file');
    } else {
      const comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile('comments.json', JSON.stringify(comments), (error) => {
        if (error) {
          res.send('Error writing file');
        } else {
          res.send('Comment added');
        }
      });
    }
  });
});

// 5. Start the web server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});