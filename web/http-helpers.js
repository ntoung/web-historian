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
  fs.readFile(asset, (err, fd) => {
    if (err) {
      console.log('Could not read file: ' + err);
      res.writeHead(404, exports.headers);
      res.end();
    } else {
      // Serve Assets
      res.writeHead(200, exports.headers);
      res.write(fd);
      res.end();
    }
  });
};

exports.sendRedirect = function(res, location) {
  res.writeHead(302, {Location: location});
  res.end();
};

exports.sendResponse = function(res, obj, status) {
  // see send404 for an example. Sending back JSON stringified object.
  status = status || 200;
  res.writeHead(status, exports.headers);
  res.end(obj);
};


exports.send404 = function(res) {
  exports.sendResponse(res, '404: Page not found', 404);
};

exports.collectData = function(req, callback) {
  var data = '';
  req.on('data', function(chunk) {
    data += chunk;
  });
  req.on('end', () => callback(data));
  // So that data is a chunk, not chunk.string() ???. Also, note that we don't need to use buffer.
};



// As you progress, keep thinking about what helper functions you can put here!
