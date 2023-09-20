/*
 * SERVER
 * Launchpoint file for the database
*/

const express = require('express');
const mongoose = require('mongoose');
const router = require('./router');
const uri = require('./uri.js');
// const cookieParser = require('cookie-parser');

mongoose.connect('mongodb://localhost:27017/IASDB', {
    useNewUrlParser: true, useUnifiedTopology: true
});


// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Allow CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", uri.frontend);
  res.setHeader("Access-Control-Allow-Methods", ["POST","GET","PUT","DELETE"]);
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-Authorization");
  res.setHeader("Access-Control-Allow-Authorization",true);
  next();
});
//app.use(cookieParser());

// Add the router exports to server
router(app);


app.listen(3001,()=> {
  console.log("Server has initialized on Port 3001.");
})
