var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('./http-helpers');
var fs = require('fs');
var _ = require('underscore');
// require more modules/folders here!

//ADDING TO GLOBAL SCOPE, SHOULD REQUIRE IT
var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.handleRequest = function (req, res) {
  
  console.log('handling ' + req.method + ' request');

  var method = req.method;
  var url = req.url;


  // check to see if url is in list
  // if (!archive.isUrlInList(req.url)) {
  //   // 1. WRITE IT TO SITES.TXT

  //   // 2. RETURN LOADING.HTML
  // } else {
  //   // 1. CHECK IF URL IS ARCHIVED

  //   // 1a. IF IT IS, RETURN 
  // }

  // console.log('request-handler:handleRequest');
  // console.log(req.method);
  
  
  
  if (method === 'GET') {
    // serve index.html by default
    if (url === '/') {
      fs.readFile(archive.paths.index, (err, fd) => {
        if (err) {
          console.log('Could not read file: ' + err);
        } else {
          console.log('Reading file');
          // Abstract to Serve Assets
          res.writeHead(200, headers);
          res.write(fd);
          res.end();
        }
      });
    } else {
      var url = url.slice(1);   // changing URL here
      
      fs.readFile(archive.paths.archivedSites + '/' + url, (err, fd) => {
        if (err) {
          console.log('Could not read file: ' + err);
          res.writeHead(404, headers);
          res.end();
        } else {
          // Serve Assets
          res.writeHead(200, headers);
          res.write(fd);
          res.end();
        }
      });
    }
  } else if (method === 'POST') {
   
    var body = [];
    req.on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body).toString();
      
      var url = body.split('=')[1];

      fs.appendFile(archive.paths.list, url + '\n', (err) => {
        if (err) {
          console.error('Could not append data');  
        } else {
          console.log('Appended data');

          res.writeHead(302, headers);
          res.end();
        }
      });
    });
  }


  // res.end(archive.paths.list);
};
