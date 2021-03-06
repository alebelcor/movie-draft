# movie-draft

> Get the data of a list of Box Office Mojo's movies.

[![npm version](https://img.shields.io/npm/v/movie-draft.svg)](https://npmjs.org/package/movie-draft)
[![Build Status](https://travis-ci.org/alebelcor/movie-draft.svg)](https://travis-ci.org/alebelcor/movie-draft)
[![Test Coverage](https://img.shields.io/coveralls/alebelcor/movie-draft/master.svg)](https://coveralls.io/github/alebelcor/movie-draft)

## Install

```bash
npm install --save movie-draft
```

## Usage

```js
var movieDraft = require('movie-draft');

movieDraft(['pulpfiction.htm']); // [ { title: 'Pulp Fiction', domesticGross: 107928762 } ]
```

## API

### movieDraft(movieIds)

Returns a **promise** that resolves to an array of objects with the data of the Box Office Mojo's movie.

#### movieIds

Type: `array` of `strings`

An array of one or more IDs of movies as presented in [Box Office Mojo](http://www.boxofficemojo.com/).

Example: The ID for [Pulp Fiction](http://www.boxofficemojo.com/movies/?id=pulpfiction.htm) would be `pulpfiction.htm`.

## License

MIT © Alejandro Beltrán
