/**
 * Module dependencies
 */
var fs       = require('fs'),
    request  = require('request'),
    cheerio  = require('cheerio'),
    entities = require('entities');


/**
 * Setup movie-draft with `options`.
 *
 * Options:
 *
 *   - `movies` movies object
 *   - `output` output file
 *
 * @param {Object} options
 */
function MovieDraft(options) {
    options = options || {};

    this.data   = [];
    this.movies = options.movies;
    this.output = options.output;
}


/**
 * Get the data of a movie.
 *
 * Movie:
 *
 *   - `id` ID of the movie
 *
 * @param {Object} movie
 */
MovieDraft.prototype.getData = function (movie) {
    var self = this,
        movieName,
        revenue,
        $;

    request.get('http://boxofficemojo.com/movies/?id=' + movie.id, function (err, res, body) {
        var movieObj;

        if (err) {
            throw err;
        }

        $ = cheerio.load(body);

        movieName = $('td > font > b').html();
        movieName = entities.decode(movieName)
            .replace('<br>', ' ');

        revenue = $('td:first-child > font > b').html();

        if (revenue === null || revenue.indexOf('$') === -1) {
            revenue = 'N/A';
        } else {
            revenue = revenue.replace(' (Estimate)', '');
        }

        movieObj = {
            'name'   : movieName,
            'revenue': revenue
        };

        self.data[self.data.length] = movieObj;

        self.save(movieObj);
    });

    return this;
};


/**
 * Iterate through all movies and get their data.
 */
MovieDraft.prototype.getAllData = function () {
    var i,
        len;

    for (i = 0, len = this.movies.length; i < len; i += 1) {
        this.getData(this.movies[i]);
    }

    return this;
};


/**
 * Format the output and save it to the file.
 *
 * Movie:
 *
 *   - `name` name of the movie
 *   - `revenue` revenue of the movie
 *
 * @param {Object} movie
 */
MovieDraft.prototype.save = function (movie) {
    var lineToAppend = '';

    lineToAppend = movie.name + ' ->' + movie.revenue + '\n';

    // append result to file
    fs.appendFile(this.output, lineToAppend);

    return this;
};


/**
 * Empty output file and get data.
 */
MovieDraft.prototype.run = function () {
    fs.openSync(this.output, 'w');

    this.getAllData();
};


/**
 * Expose `MovieDraft`.
 */

exports = module.exports = MovieDraft;
