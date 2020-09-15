//jshint esversion:6
require('dotenv').config()
// import { init } from "./rating.js";

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const tb = require('./rating');
const { Student } = require('./rating');

mongoose.connect("mongodb://localhost:27017/studentDB",{ useUnifiedTopology: true ,useNewUrlParser: true});

const app = express();
app.set('view engine', 'ejs');



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {
  res.render("home");
});

app.get("/ranking", function(req, res) {
studentsA = tb.print_table(Student).exec();
console.log(studentsA);
studentsA.then(function(students){
students.sort(function(a,b){
  return b.rating-a.rating;
});
console.log(students);
    res.render("ranking",{students:students,user:"Jacob"});
});

});




app.get("/video/:postID", function(req, res){
  const postID = req.params.postID;
  Post.findById(postID, function (err, post) {
    if(err || !post)
    {
      console.log("No post was found");
    }
    else{
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
})

});


// tb.init(tb.Student);
app.listen(3000, function() {
  console.log("Server started successfully");
});
