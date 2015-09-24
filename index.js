'use strict';

var boxOfficeMojoMovie = require('box-office-mojo-movie');
var Promise = require('bluebird');

module.exports = function (movieIds) {
  var isAnyMovieIdInvalid;
  var moviePromises = [];

  if (!Array.isArray(movieIds)) {
    throw new Error('Parameter should be an array');
  }

  if (movieIds.length < 1) {
    throw new Error('Movie IDs array should have one or more items');
  }

  isAnyMovieIdInvalid = movieIds.some(function (id) {
    return typeof id !== 'string' || (typeof id === 'string' && id.length < 5);
  });

  if (isAnyMovieIdInvalid) {
    throw new Error('Movie IDs in array should be valid strings');
  }

  movieIds.forEach(function (id) {
    moviePromises.push(boxOfficeMojoMovie(id));
  });

  return Promise.all(moviePromises);
};
