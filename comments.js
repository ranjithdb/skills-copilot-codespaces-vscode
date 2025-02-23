// Create web server
// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var qs = require('querystring');

var comments = [];

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  if (request.method === "POST") {
    var body = '';
    request.on('data', function(data) {
      body += data;
    });
    request.on('end', function() {
      var comment = qs.parse(body).comment;
      comments.push(comment);
      response.writeHead(302, {
        'Location': '/'
      });
      response.end();
    });
  } else {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end(`
      <form method="POST" action="/">
        <textarea name="comment"></textarea>
        <button>Submit</button>
      </form>
      <ul>
        ${comments.map(function(comment) {
          return `<li>${comment}</li>`;
        }).join('')}
      </ul>
    `);
  }
});

// Listen on port 8000, IP defaults to