
//Create the server
function init(){

  const http = require('http');
  const port = 3000;

  http.createServer(server).listen(port);

}

//The server itself
function server(req,res){

  const fs = require('fs');

  //Render the HTML file
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('./render.html',null,function(error,data){

      if(error){

        //The HTML is broken
        res.writeHead(404);
        res.write('File Not Found! Make sure it is in the same directory as the server!');

      }else{

        //The HTML is ok
        console.log('The HTML file worked!');
        res.write(data);

      }

      res.end()

  });
}

//Make Zoom API call
function zoomer(){

  const rp = require('request-promise');

  //Connection request uri
  const connect_uri = 'https://api.zoom.us/v2/users';

  //List of recordings uri
  const uri2 = 'https://api.zoom.us/v2/users/BeOH5DDDReyRgPqyNAWiWA/recordings'

  const options = {
      uri: connect_uri,
        qs: {
          status: 'active' // -> uri + '?status=active'
        },

      auth: {
        //JWT token
        'bearer': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IjN5Z21SODZaUUd1X0FQcnc2NUhaS2ciLCJleHAiOjE2MDAwOTUzODEsImlhdCI6MTU5OTQ5MDU4MX0.zuYsOScY9HyXjsnsOtWYXVtmnVh1Mu891awljvZ3U-g'
  	    },
      headers: {
        'User-Agent': 'Zoom-Jwt-Request',
        'content-type': 'application/json'
      },
        json: true // Automatically parses the JSON string in the response
  };

rp(options)
    .then(function (response) {

      //logic for your response
      console.log('User has', response);

    })
    .catch(function (err) {

        // API call failed...
        console.log('API call failed, reason ', err);

});

}


init();