
//Create the server
function init(){

  const http = require('http');

  const hostname = 'localhost';
  const port = 3000;

  const server = http.createServer((req, res) => {
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');

  });

  server.listen(port, hostname, () => {

    console.log(`Server running at http://${hostname}:${port}/`);
    
  });

}

//Make Zoom API call
function zoomer(){

  var rp = require('request-promise');

  //Connection request uri
  var connect_uri = 'https://api.zoom.us/v2/users';

  //List of recordings uri
  var uri2 = 'https://api.zoom.us/v2/users/BeOH5DDDReyRgPqyNAWiWA/recordings'

  var options = {
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