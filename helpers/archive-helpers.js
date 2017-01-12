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
  //console.log('archive-helpers:readListOfUrls');

  fs.readFile(this.paths.list, 'utf-8', (err, fd) => {
    err ? console.err('nothing found at url: ' + url) : cb(err, fd.split('\n'));
  });
};

exports.isUrlInList = function(url, cb) {
  // console.log('archive-helpers:isUrlInList');
  // console.log('url:' + url);

  return this.readListOfUrls(function(err, urls) {
    err ? console.error('could not find url in list') : cb(err, _.contains(urls, url));
  });
};


exports.addUrlToList = function(url, cb) {
  // console.log('archive-helpers:addUrlToList');
  // console.log(this.paths);

  fs.appendFile(this.paths.list, url + '\n', (err) => {
    err ? console.error('could not add url to list') : cb(err);
  });

};

exports.isUrlArchived = function(url, cb) {
  // console.log('archive-helpers:isUrlArchived');
  // console.log(this.paths.archivedSites + url);

  fs.stat(this.paths.archivedSites + '/' + url, (err) => {
    err ? cb(null, false) : cb(null, true);
  });
};

// return archived url
exports.downloadUrls = function(urls) {
  // TO DO.
  //console.log('archive-helpers:downloadUrls');

  // create a file for each 'url' in urls
  _.each(urls, url => {
    this.isUrlArchived(url, (err, exists) => {
      if (!exists) {
        fs.writeFile(this.paths.archivedSites + '/' + url, url + 'contents', err => {
          err ? console.error('could not write file to archivedSites') 
              : console.log('file written to archivedSites');
        });
      } 
    });
  });
};













