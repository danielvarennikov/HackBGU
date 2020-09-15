// Create the connection to the database
const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

// const db = mongoose.connection;

// const rating = new mongoose.Schema({
//   user: String,
//   rating: Number,
//   name : String
// });



// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log("Worked")
// });



// const Student = mongoose.model('Student', rating);
const rating = new mongoose.Schema({
  user: String,
  rating: Number,
  name : String
});

const Student = mongoose.model('Student', rating);

function init(table){


  const daniel = new Student({
    name : "Daniel",
    user:"Dentist",
    rating:300,
  });
  const yontan = new Student({
    name : "Yontan",
    user:"XxYontanxX",
    rating:282,
  });
  const baraa = new Student({
    name : "Baraa",
    user:"Baraa",
    rating:253,
  });
  const andalus = new Student({
    name : "Andalus",
    user:"Andalus",
    rating:222,
  });
  const yakov = new Student({
    name : "Yakov",
    user:"Jacob",
    rating:320,
  });
  table.insertMany([daniel,yontan,baraa,andalus,yakov],function(err,students){
    if(err){
      console.log(err);
    }
    else{
      console.log(students);
    }
  });


}



// export{init};
//Insert a user to a table -> starting rating is 0
function insert_user(Student,username) {

  //Create the user
  const new_user = new Student({user: username, rating: 0});


  //Check if it already exists
  Student.findOne({ user: username}, function(err, found_user) {

    if (err){
      console.log("Couldn't access db");
      return false;
    }
    else{
        //User already exists
        if(found_user != null){
            console.log('User already exists!');
            return false;
        }else{

        //Add it to the table
        new_user.save(function (err, new_user) {
            if (err){
                console.error(err);
                return false;
            }
            console.log(`User ${username} has been added`);
            return true;
        });

      }
    }
  })
}

//Print a table
function print_table(table){
  return table.find({},function (err, users) {
    if (err){
        console.error(err);
        return null;
    }
    console.log(users);
    return users;
  })
}

//Increase the rating of a user by 1
function increase_rating(table, user){

  table.findOne({ user: user}, function(err, found_user) {

    if (err){
      console.log("Couldn't access db");
      return false;
    }
    else{
        //Increase the rating by one
        if(found_user != null){
            console.log("Caught one");

            var new_rating = found_user.rating + 1;
            found_user.rating = new_rating;
            found_user.save(function (err) {
            if (err){
              console.log("Couldn't save new rating");
              return false;
            }
            return true;
        });
        }
    }
  })
}

//Decrease the rating of a user by 1
function decrease_rating(table, user){

  table.findOne({ user: user}, function(err, found_user) {

    if (err){
      console.log("Couldn't access db");
      return false;
    }
    else{
        //Increase the rating by one
        if(found_user != null){
            console.log("Caught one");
            var new_rating = found_user.rating - 1;
            found_user.rating = new_rating;
            found_user.save(function (err) {
            if (err){
              console.log("Couldn't save new rating");
              return false;
            }
            return true;
        });

        }
    }
  })
}

//Get the rating of a user
function get_rating(table,user){

  //Check if it already exists
  table.findOne({ user: username}, function(err, found_user) {

    if (err){
      console.log("Couldn't access db");
      return false;
    }
    else{
        //User exists
        if(found_user != null){
            console.log(found_user.rating);
            return true;
        }else{
          //User does not exist
          console.log("User does not exist");
          return false;
      }
    }
  })

}

module.exports = { init , get_rating , insert_user , print_table , increase_rating , decrease_rating ,Student}
