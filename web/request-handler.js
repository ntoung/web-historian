var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('./http-helpers');
var fs = require('fs');
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
      // Modify header/status code

      // serve assets will serve up html files and 
      // http.serveAssets()

      // fs.readFile('url', 'utf-8', (err, fd) => {
      fs.readFile(archive.paths.index, (err, fd) => {
        if (err) {
          console.log('Could not read file: ' + err);
        } else {
          console.log('Reading file');
          // Write status code 200 and include default headers
          res.writeHead(200, headers);
          res.write(fd);
          // console.log(fd.toString());
          res.end();
        }
      });
      //Hard code solution to first spec
      // res.end('<input');
    } else {
      // url: /arglebargle




      // read sites.text with cb
      // archive.

      // cb = if doesn't include, throw 404.
      //       if includes, read sites/url with cb2,
      //          cb2 = serve contents. 




      //Serve Assets






      console.log(url);
      // /www.google.com

      // remove '/'' prefix
      var url = url.slice(1);

      // if '/www.google.com' is in sites.txt
      if (archive.isUrlInList(url)) {
        // go to sites folder, read and res/write 
        console.log('YOYOYO');
        console.log(archive.paths.archivedSites + '/' + url);
        fs.readFile(archive.paths.archivedSites + '/' + url, (err, fd) => {
          if (err) {
            console.log('Could not read file: ' + err);
          } else {
            // Write status code 200 and include default headers
            res.writeHead(200, headers);
            res.write(fd);
            // console.log(fd.toString());
            res.end();
          }
        });
      }

      

        



    }
    // res.writeHead(404, headers);
    // res.end();
    console.log(archive.paths.index);
  }

  

  // res.end(archive.paths.list);
};
