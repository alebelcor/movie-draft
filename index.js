var fs       = require('fs'),

    async    = require('async'),
    request  = require('request'),
    cheerio  = require('cheerio'),
    entities = require('entities'),

    inputFile  = 'winter-draft-2013.json',
    outputFile = 'output.txt',

    movies = JSON.parse(fs.readFileSync(inputFile, 'utf8')),

    fetchMovieRevenue = function (movie) {
        var movieName,
            revenue,
            $;

        request.get(movie.url, function (err, res, body) {
            var lineToAppend;

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

            lineToAppend = movieName + ' -> ' + revenue + '\n';

            // append result to file
            fs.appendFile(outputFile, lineToAppend);
        });
    };

// empty the file
fs.openSync(outputFile, 'w');

async.forEach(movies, fetchMovieRevenue, function (err) {
    if (err) {
        throw err;
    }
});
