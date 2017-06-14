"use strict";
/** 

Here's the list of the OS, software, and libraries I'm using

Software on Macbook Pro 17-inch, Mid 2009
-----------------------------------------
Mac OSX: 10.9.4
Node.js: 0.10.31
MongoDB: 2.6.4


Node.js libraries from package.json
-----------------------------------
async: ^0.9.0
bcrypt-nodejs: 0.0.3
mongodb: ^1.4.18
mongoose: ^3.8.16

**/


// Import async.js - utility library for handlng asynchronous calls
var async = require('async');

// URL to connect to a local MongoDB with database test.
// Change this to fit your running MongoDB instance
var databaseURL = 'mongodb://dbuser:Emerson123@ds163681.mlab.com:63681/meetingstandupnotes';

// Import native MongoDB client for Node.js
var MongoClient = require('mongodb').MongoClient;

// Import mongoose.js to define our schema and interact with MongoDB
var mongoose = require('mongoose');



// Define Book schema model with 3 fields: user, email, password
var bookSchema = new mongoose.Schema({
    title: {
        type: String
    },
    author: {type: String},
    genre: {type: String},
    read: {type: Boolean, default: false}
});



var Book = mongoose.model('Book', bookSchema);

// Async series method to make sure asynchronous calls below run sequentially
async.series([
  
  // First function - connect to MongoDB, then drop the database
  function(callback) {
    

     // Originally, I wanted to use mongoose to drop the database 
     // but the code below doesn't drop the database, only clears 
     // all documents. Refer to:
     //
     //https://github.com/LearnBoost/mongoose/issues/1654
    /*
    mongoose.connection.on('open', function() { 
      mongoose.connection.db.dropDatabase(function(err) {
        if (err) console.log(err);
  
        mongoose.connection.close(function(err) {
          callback(null, 'Dropped database');
        });
      });
    });
    */
    
    MongoClient.connect(databaseURL, function(err, db) {
      
      if(err){
        throw err;
      } 
      
      // Drop database which is an asynchronous call
      db.dropDatabase(function(err, result) {

        // After successfully dropping database, force close database which is another asynchronous call 
        db.close(true, function(err, result) {

          // Close successful so execute callback so second function in async.serial gets called
          callback(null, 'SUCCESS - dropped database');
        });
      });
    });
  },
  
  // Second function - connect to MongoDB using mongoose, which is an asynchronous call
  function(callback) {
    
    // Open connection to MongoDB
    mongoose.connect(databaseURL);
    
    // Need to listen to 'connected' event then execute callback method
    // to call the next set of code in the async.serial array
    mongoose.connection.on('connected', function(){
      console.log('db connected via mongoose');
      
      // Execute callback now we have a successful connection to the DB
      // and move on to the third function below in async.series 
      callback(null, 'SUCCESS - Connected to mongodb');
    });
  },
  
  // Third function - use Mongoose to create a User model and save it to database
  function(callback) {

    // BEGIN SEED DATABASE
    
    // Use an array to store a list of User model objects to save to the database
    var books = [];
    var testBookCount = 20;
    for (var i = 0; i < testBookCount; i++) {

      var book = new Book({
        title: i,
        author: i + '@' + i + '.com',
        genre: i + '@' + i + '.com'
        
      });

      // Add newly create User model to 'users' array
      books.push(book);
    }
    
    console.log("Populating database with %s books", books.length);

    
    // Use 'async.eachSeries' to loop through the 'users' array to make 
    // sure each asnychronous call to save the user into the database
    // completes before moving to the next User model item in the array
    async.eachSeries(
      
      // 1st parameter is the 'users' array to iterate over 
      books, 
        
      // 2nd parameter is a function takes each user in the 'users' array 
      // as an argument and a callback function that needs to be executed 
      // when the asynchronous call complete. 
      
      // Note there is another 'callback' method here called 'userSavedCallBack'.
      // 'userSavedCallBack' needs to be called to inform async.eachSeries to 
      // move on to the next user object in the 'users' array. Do not mistakenly
      // call 'callback' defined in line 130.
      function(book, bookSavedCallBack){

        // There is no need to make a call to create the 'test' database.
        // Saving a model will automatically create the database
        book.save(function(err) {

          if(err) {
            // Send JSON response to console for errors
            console.dir(err);
          }
          
          // Print out which user we are saving
          console.log("Saving book #%s out of %s", book.name, testBookCount);
          
          // Call 'userSavedCallBack' and NOT 'callback' to ensure that the next
          // 'user' item in the 'users' array gets called to be saved to the database
          bookSavedCallBack();
        });

      },
      
      // 3rd parameter is a function to call when all users in 'users' array have 
      // completed their asynchronous user.save function
      function(err){
        
        if (err) {
          console.dir(err);
        }
        
        console.log("Finished aysnc.each in seeding db");

        // Execute callback function from line 130 to signal to async.series that
        // all asynchronous calls are now done
        callback(null, 'SUCCESS - Seed database');

      }
    );

    // END SEED DATABASE

  }
],

// This function executes when everything above is done
function(err, results){

  console.log("\n\n--- Database seed progam completed ---");
  
  if(err) {
    console.log("Errors = ");
    console.dir(err);
  } else {
    console.log("Results = ");
    console.log(results);
  }

  console.log("\n\n--- Exiting database seed progam ---");
  // Exit the process to get back to terrminal console 
  process.exit(0);
});