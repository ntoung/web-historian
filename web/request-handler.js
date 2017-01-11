var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // check to see if url is in list
  archive.isUrlInList(req.url);




  res.end(archive.paths.list);
};
