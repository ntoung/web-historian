var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  // fs.readFile('url', 'utf-8', (err, fd) => {
  fs.readFile(archive.paths.index, (err, fd) => {
    if (err) {
      console.log('Could not read file: ' + err);
    } else {
      // Write status code 200 and include default headers
      res.writeHead(200, headers);
      
      console.log(fd.toString());
      res.end(fd);
    }
  });
};



// As you progress, keep thinking about what helper functions you can put here!
