const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 5000;

const Users = require("./datainterface.js");
let User = new Users();


app.listen(
    PORT,
    () => console.log(`This application runs on http://localhost:${PORT}`)
)

 //(MIDDLEWARE)
 
 //Parse incoming JSON requests
 app.use(express.json());

 //Allow cross app communication
 app.use((_req, res, next) => {
     res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
     res.header(
         "Access-Control-Allow-Headers",
         "Origin, X-Requested-With, Content-Type, Accept"
     );
     next();
 });

 // HTTP request methods

// provide whole list of users (parsed JSON)
app.get("/users", (req, res) => {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    const parsedData = User.getAllUsers();
    res.json(parsedData.slice(offset, offset + limit));
});

// ADDING A USER
app.post("/users", (req, res) => {
    const newUser = JSON.parse(req.body);
    User.addUser(newUser);
    // res.status(201).send("User created successfully");
    res.json(newUser);
  });








// provides a specified user
// app.get("/user/:id", (req, res) => {
//      const {id} = req.params; //req.query.id davor
//      const parsedData = User.getAllUsers();
//      const index = User.getIndexById(id, parsedData);
//      res.json(parsedData[index]);
//  });


//  app.put("/users/:id", (req, res) => {
//     const { id } = req.params;
//     const updatedUser = req.body;
//     User.updateUser(id, updatedUser);
//     res.json(updatedUser);
//   });
  

//  app.delete("/deleteUser", (req, _res) => {
//      const id = req.query.id;
//      User.deleteUser(id);
//  });
