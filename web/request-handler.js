var path = require('path');
var archive = require('../helpers/archive-helpers');
var http = require('./http-helpers');
var fs = require('fs');
var _ = require('underscore');
var url = require('url');
// require more modules/folders here!

//ADDING TO GLOBAL SCOPE, SHOULD REQUIRE IT
var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};


var actions = {
  'GET': function(req, res) {
    req.url === '/' ? 
    asset = archive.paths.index : 
    asset = archive.paths.archivedSites + '/' + req.url;
    http.serveAssets(res, asset);
  },
  
  'POST': function(req, res) {
    http.collectData(req, function(data) {
      var urlPath = data.split('=')[1].replace('http://', '');
      // var urlPath = url.parse(data).pathname;
      console.log('urlPath: ' + urlPath);
      archive.isUrlInList(urlPath, function(found) {
        if (found) {
          archive.isUrlArchived(urlPath, function(exists) {
            if (exists) {
              // redirect to site page
              http.sendRedirect(res, '/' + urlPath);
            } else {
              http.sendRedirect(res, '/loading.html');
            }
          });
        } else { // not found
          // add to sites.txt
          archive.addUrlToList(urlPath, function() {
            // Redirect to loading.html
            http.sendRedirect(res, '/loading.html');
          });
        }
      });
    });


  }
};


exports.handleRequest = function (req, res) {
  var handler = actions[req.method];
  // ???
  if (handler) {
    handler(req, res);
  } else {
    helpers.send404(response);
  }


  // var method = req.method;
  // var url = req.url;
  // var asset;
  // var handler = actions[req.method];



};

  
 
    

  
