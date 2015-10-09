'use strict';

var test = require('ava');
var movieDraft = require('./');

test('it should throw an error if not an array or empty', function (t) {
  t.throws(function () { return movieDraft({}); });
  t.throws(function () { return movieDraft(Error); });
  t.throws(function () { return movieDraft(function () {}); });
  t.throws(function () { return movieDraft(null); });
  t.throws(function () { return movieDraft(void 0); });
  t.throws(function () { return movieDraft(NaN); });
  t.throws(function () { return movieDraft(''); });
  t.throws(function () { return movieDraft(0); });
  t.throws(function () { return movieDraft(true); });

  t.throws(function () { return movieDraft([]); });
  t.end();
});

test('it should throw an error if any movie ID is not valid', function (t) {
  t.throws(function () { return movieDraft(['pulpfiction.htm', {}]); });
  t.throws(function () { return movieDraft(['pulpfiction.htm', Error]); });
  t.throws(function () { return movieDraft(['pulpfiction.htm', function () {}]); });
  t.throws(function () { return movieDraft(['pulpfiction.htm', null]); });
  t.throws(function () { return movieDraft(['pulpfiction.htm', void 0]); });
  t.throws(function () { return movieDraft(['pulpfiction.htm', NaN]); });
  t.throws(function () { return movieDraft(['pulpfiction.htm', '']); });
  t.throws(function () { return movieDraft(['pulpfiction.htm', 0]); });
  t.throws(function () { return movieDraft(['pulpfiction.htm', true]); });
  t.throws(function () { return movieDraft(['pulpfiction.htm', 'id']); });
  t.throws(function () { return movieDraft(['pulpfiction.htm', '.htm']); });
  t.doesNotThrow(function () { return movieDraft(['pulpfiction.htm']); });
  t.end();
});

test('it should return a promise', function (t) {
  t.same('function', typeof movieDraft(['pulpfiction.htm']).then);
  t.end();
});

test('it should return a promise with the movie data', function (t) {
  movieDraft(['pulpfiction.htm', 'returnoftheking.htm']).then(function (movies) {
    t.true(Array.isArray(movies));
    t.same(2, movies.length);
    t.end();
  });
});
