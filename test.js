'use strict';

var test = require('ava');
var movieDraft = require('./');

test('it should throw an error if an array with at least one movie ID was not passed in', function (t) {
  t.throws(function () { return movieDraft(); });
  t.throws(function () { return movieDraft(null); });
  t.throws(function () { return movieDraft(123); });
  t.throws(function () { return movieDraft(true); });
  t.throws(function () { return movieDraft('pulpfiction.htm'); });
  t.throws(function () { return movieDraft([]); });
  t.end();
});

test('it should throw an error if any movie ID is not valid', function (t) {
  t.throws(function () { return movieDraft(['pulpfiction.htm', null]); });
  t.throws(function () { return movieDraft(['pulpfiction.htm', 123]); });
  t.throws(function () { return movieDraft(['pulpfiction.htm', true]); });
  t.throws(function () { return movieDraft(['pulpfiction.htm', '']); });
  t.throws(function () { return movieDraft(['pulpfiction.htm', 'id']); });
  t.throws(function () { return movieDraft(['pulpfiction.htm', '.htm']); });
  t.end();
});

test('it should return a promise', function (t) {
  t.same('function', typeof movieDraft(['pulpfiction.htm']).then);
  t.end();
});

test('it should return a promise with the movie data', function (t) {
  return movieDraft(['pulpfiction.htm', 'returnoftheking.htm']).then(function (movies) {
    t.true(Array.isArray(movies));
    t.same(2, movies.length);
  });
});
