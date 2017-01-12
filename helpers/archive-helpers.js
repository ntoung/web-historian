var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
  index: path.join(__dirname, '../web/public/index.html')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  console.log('archive-helpers:readListOfUrls');

  fs.readFile(this.paths.list, 'utf-8', (err, fd) => {
    console.log('\treadListOfUrls: reading file');
    if (err) {
      console.err('nothing found at url: ' + url);
    } else {
      // create an array of urls
      cb(fd.split('\n'));

    }

    // fd.close();
  });
};

exports.isUrlInList = function(url) {
  console.log('archive-helpers:isUrlInList');
  console.log('url:' + url);

  return this.readListOfUrls(function(urls) {
    return _.contains(urls, url);
  });
};


exports.addUrlToList = function() {
  console.log('archive-helpers:addUrlToList');
  console.log(this.paths);
  // fs.write()
};

exports.isUrlArchived = function() {
  console.log('archive-helpers:isUrlArchived');
};

// return archived url
exports.downloadUrls = function() {
  console.log('archive-helpers:downloadUrls');
};
