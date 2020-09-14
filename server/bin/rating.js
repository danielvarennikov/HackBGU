// Create the connection to the database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

const db = mongoose.connection;

const rating = new mongoose.Schema({
  user: String,
  rating: Number
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Worked")
});



const Algebra = mongoose.model('Algebra', rating);

//Insert a user to a table -> starting rating is 0
function insert_user(table,username) {
  
  //Create the user
  const new_user = new table({user: username, rating: 0});


  //Check if it already exists
  table.findOne({ user: username}, function(err, found_user) {
    
    if (err)
      console.log("Couldn't access db");    
    else{

        //User already exists
        if(found_user != null){
            console.log('User already exists!');
        }else{

        //Add it to the table
        new_user.save(function (err, new_user) {
            if (err) return console.error(err);
            console.log(`User ${username} has been added`);

        });

      }
    }
  })
}
  
//Print a table
function print_table(table){
  table.find(function (err, users) {
    if (err) return console.error(err);
    console.log(users);
  })
}

//Increase the rating of a user by 1
function increase_rating(table, user){

  table.findOne({ user: user}, function(err, found_user) {
    
    if (err)
      console.log("Couldn't access db");    
    else{

        //Increase the rating by one
        if(found_user != null){
            console.log("Caught one");

            var new_rating = found_user.rating + 1;
            found_user.rating = new_rating;
            found_user.save(function (err) {
            if (err){
              console.log("Couldn't save new rating");  
              }
        });

        }
    }
  })
}

//Decrease the rating of a user by 1
function decrease_rating(table, user){

  table.findOne({ user: user}, function(err, found_user) {
    
    if (err)
      console.log("Couldn't access db");    
    else{

        //Increase the rating by one
        if(found_user != null){
            console.log("Caught one");

            var new_rating = found_user.rating - 1;
            found_user.rating = new_rating;
            found_user.save(function (err) {
            if (err){
              console.log("Couldn't save new rating");  
              }
        });

        }
    }
  })
}

//Get the rating of a user
function get_rating(table,user){

  //Check if it already exists
  table.findOne({ user: username}, function(err, found_user) {
    
    if (err)
      console.log("Couldn't access db");    
    else{

        //User exists
        if(found_user != null){
            console.log(found_user.rating);
        }else{

          //User does not exist
          console.log("User does not exist");

      }
    }
  })
  
}






