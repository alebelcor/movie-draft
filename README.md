# movie-draft.js

## What is a "movie draft"?

This is how the draft works:

* We have a list of unreleased movies.
* Each player has 100 dollars/rupies/whatever to spend over the entire draft.
* The draft will be conducted as an auction featuring the unreleased movies as items.
* At the end of the auction, each player will have a list of movies.
* You'll get a point for every domestic (US) gross dollar a movie of yours makes.
* The player with the most points wins the movie draft.


## What does `movie-draft.js` do?

It will scrape the Box Office Mojo website and get the domestic gross of a list of movies into a text file.


## Installation

You can install movie-draft.js using `npm`:

    npm install -g movie-draft


## Usage

    movie-draft -i input.json -o output.txt


### Input JSON

The input should be an array of objects, each object should have an `ID` property with a value that corresponds to the movie ID at [Box Office Mojo](http://boxofficemojo.com).

Please take a look at the example JSON files in the repo for reference.

Note: [This is a work in progress](http://www.youtube.com/watch?v=X8u7px_GzWQ)
