require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/studentDB",{ useUnifiedTopology: true ,useNewUrlParser: true});


const studentSchema = new mongoose.Schema({
   name: String,
   score: Number
});
const Student = mongoose.model('Student', studentSchema);
const app = express();
app.set('view engine', 'ejs');



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {
  res.render("home");
});

app.get("/ranking", function(req, res) {
  Student.find({},function(err,students){
students.sort(function(a,b){
  return b.score-a.score;
})
    res.render("ranking",{students:students,name:"Baraa"});
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



app.listen(3000, function() {
  console.log("Server started successfully");
});
