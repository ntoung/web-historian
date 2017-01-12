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
      // First check to see if the file client requests exists.
      fs.readFile(archive.paths.list, (err, fd) => {
        if (err) {
          console.log('you messed up ' + err);
        } else {
          console.log('reading archive list');
          console.log(fd.toString());
          // sites.txt contains the URL, so the file client is asking for exists.
          if (_.contains(fd.toString().split('\n'), url)) {
            fs.readFile(archive.paths.archivedSites + '/' + url, (err, fd) => {
              if (err) {
                console.log('Could not read file: ' + err);
              } else {
                // Serve Assets
                res.writeHead(200, headers);
                res.write(fd);
                res.end();
              }
            });
          } else {
            // sites.txt does NOT contain the URL, so no file exits. Serve Error.
            res.writeHead(404, headers);
            res.end();
          }
        }
      });


      // read sites.text with cb
      // archive.

      // cb = if doesn't include, throw 404.
      //       if includes, read sites/url with cb2,
      //          cb2 = serve contents. 



      // console.log(url);
      // // /www.google.com

      // // remove '/'' prefix
      // var url = url.slice(1);

      // // if '/www.google.com' is in sites.txt
      // if (archive.isUrlInList(url)) {
      //   // go to sites folder, read and res/write 
      //   console.log('YOYOYO');
      //   console.log(archive.paths.archivedSites + '/' + url);
      //   fs.readFile(archive.paths.archivedSites + '/' + url, (err, fd) => {
      //     if (err) {
      //       console.log('Could not read file: ' + err);
      //     } else {
      //       // Write status code 200 and include default headers
      //       res.writeHead(200, headers);
      //       res.write(fd);
      //       // console.log(fd.toString());
      //       res.end();
      //     }
      //   });
      // }

    }
  } else if (method === 'POST') {


  }


  // res.end(archive.paths.list);
};
