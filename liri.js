// Solutions Demo 12/04/18 vid 4 at -1:14
// reads and sets global environment variable (supplied by instructions)
require("dotenv").config();

// supplied by moment documentation
var moment = require('moment');
moment().format();

// Global variable for app
var keys = require("./keys"); //This contains hidden keys, called by
var axios = require("axios") //
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// Takes in the "argument" typed into the console
// Remember, first argument will alwasys be [2] in any node object
let action = process.argv[2];

// Joins all the other arguments together
let term = process.argv.slice(3).join(" ");


// concert-this function gets
/* -Name of venue, -Name of location, -Date of the Event 
(Need MomentJs to format as MM/DD/YY)*/

// When concert-this is typed, this function calls Bands in Town Artist Events API
function concertThis(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            var concertData = response.data
            console.log(concertData)
            // console.log(concertData.venue.name)
            // console.log(concertData.datetime)

            

        });
}
// When movie-this is typed this function calls movie from OMDB API
function movieThis(movieName) {
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=" + process.env.MOVIE_SECRET)
        .then(function (response) {
            var data = response.data
            // console.log(response.data);
            console.log("* Title: " + data.Title);
            console.log("* Year: " + data.Year);
            console.log("* IMDB: " + data.Ratings[0].Value);
            console.log("* Roten Tomatoes: " + data.Ratings[1].Value);
            console.log("* Country: " + data.Country);
            console.log("* Language: " + data.Language);
            console.log("* Plot: " + data.Plot);
            console.log("* Actors: " + data.Actors);
        })
    // Mr. Nobody if no movie title is input.
}

// If statement to run a function
if (action == "concert-this") {
    concertThis(term);
}
else if (action == "do-what-it-says") {
    doWhatItSays(term);
}
else if (action == "spotify-this-song") {
    spotifyThis()
}
else if (action == "movie-this") {
    movieThis(term)

}




// node liri.js spotify-this-song '<song name here>'
/* 
- Artist(s), - The song's name, - A preview link of the song from Spotify
-The album that the song is from */






