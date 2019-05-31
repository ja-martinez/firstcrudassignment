// Build your first crud app! Using what we learned yesterday create a full crud app for user objects. The objects should look like this: { "name":"user name", "email": "user email", "state": "CA" }

// Here's a list of all the routes you'll need.

// Create route for creating new users
// Get route for getting all users
// Get route for getting a user by name
// Update route for updating a user by name
// Delete route for deleting a user by name
// Stretch:
// Add an id field to the object and use that instead of name for all of your routes.

const express = require("express");
const fs = require('fs');
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
// Use the array below to store the users. Add/remove/update items in it based off
let storage = [];
storage = JSON.parse(fs.readFileSync('./storage.json', 'utf8'));
app.use(bodyParser.json());

app.delete('/users/:name', function(req, res) {
  let found = false;
  for (let index=0; index<storage.length; index++) {
    if (storage[index].name === req.params.name) {
      storage.splice(index, 1);
      found = true;
      fs.writeFileSync('./storage.json', JSON.stringify(storage));
      res.sendStatus(200);
    }
  }

  if (!found) {
    res.sendStatus(400);
  }
})

app.put('/users/:name', function(req, res) {
  let user = req.body;
  let found = false

  for (let index=0; index<storage.length; index++) {
    if (storage[index].name === req.params.name) {
      storage[index] = user;
      found = true;
      fs.writeFileSync('./storage.json', JSON.stringify(storage));
      res.sendStatus(200);
    }
  }

  if (!found) {
    res.sendStatus(400);
  }
}) 

app.post('/users', function(req, res) {
  let user = req.body;
  storage.push(user);

  fs.writeFileSync('./storage.json', JSON.stringify(storage));

  res.sendStatus(200);
})

app.get('/users', function(req, res) {
  res.send(JSON.stringify(storage));
})

app.get('/users/:name', function(req, res) {
  let found = false;

  for (let index=0; index<storage.length; index++) {
    if (storage[index].name === req.params.name) {
      found = true;
      res.send(JSON.stringify(storage[index]));
    }
  }

  if (!found) {
    res.sendStatus(400);
  }
})

app.use(function(req, res) {
  res.sendStatus(404);
})


app.listen(port, ()=>{
  console.log(`Listening on port ${port}`);
})
