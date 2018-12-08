// Solutions Demo 12/04/18 vid 4 at -1:14
// reads and sets global environment variable (supplied by instructions)
require("dotenv").config();

// supplied by moment documentation
var moment = require('moment');
moment().format();

// Global variable for app
var keys = require("./keys"); // Link to hidden keys, called by the APIs
var axios = require("axios") //  Link to axios npm
var moment = require("moment"); // Link to moment npm
var Spotify = require("node-spotify-api"); // Link to spotfy npm
var spotify = new Spotify(keys.spotify); // creats instance of Spotify key

// Takes in the "argument" typed into the console
// Remember, first argument will alwasys be [2] in any node object
let action = process.argv[2];

// Joins all the other arguments together
let term = process.argv.slice(3).join(" ");

// ================================concert-this===============================
// When concert-this is typed, this function calls Bands in Town artist events API
function concertThis(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {

            var concertData = response.data

            for (var i = 0; i < concertData.length; i++) {
                console.log("-------------------------------------")
                console.log(concertData[i].venue.name);
                console.log(concertData[i].venue.city);
                console.log(moment(concertData[i].datetime).format("MM/DD/YY"));
                console.log("-------------------------------------")
            }


        })
        .catch(function (err) {
            console.log(err);
        });
}
// =======================movie this======================================
// When movie-this is typed this function calls movie from OMDB API
function movieThis(movieName) {

    // Default set as Mr. Nobody if user doesn't specify a movie.
    if (movieName == "") {
        movieName = "Mr. Nobody"
    }
    // Call to and responce from omdb API
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=" + process.env.MOVIE_SECRET)
        .then(function (response) {

            var data = response.data

            console.log("-------------------------------");
            console.log("* Title: " + data.Title);
            console.log("* Year: " + data.Year);
            console.log("* IMDB: " + data.Ratings[0].Value);
            console.log("* Roten Tomatoes: " + data.Ratings[1].Value);
            console.log("* Country: " + data.Country);
            console.log("* Language: " + data.Language);
            console.log("* Plot: " + data.Plot);
            console.log("* Actors: " + data.Actors);
            console.log("---------------------------------");
        })
        .catch(function (err) {
            console.log(err);
        });
}

// =================================spotify-this-song==========================
// When spotify-this-song is typed this function calls song from Spotify API
function spotifyThisSong(songName) {

    // Default set as "The Sign" by Ace of Base if user doesn't specify a song.
    if (songName == "") {
        songName = "The Sign";
    };
    // URL for this one is defined inside "node-spotify-api". Therefore it only needs arguments as shown below.
    spotify.search({ type: 'track', query: songName, limit: 10 })
        .then(function (response) {

            var spotifyResponse = response.tracks

            if (songName == "The Sign") {
                return (console.log("-----------------------------" + "\n",
                    "Song Title: " + spotifyResponse.items[8].name + "\n",
                    "Album: " + spotifyResponse.items[8].album.name + "\n",
                    "Artist/s: " + spotifyResponse.items[8].artists[0].name + "\n",
                    "Preview URL: " + spotifyResponse.items[8].external_urls.spotify + "\n",
                    "-----------------------------"));

            }
            for (var i = 0; i < spotifyResponse.items.length; i++) {
                console.log("-----------------------------");
                console.log("Song Title: " + spotifyResponse.items[i].name);
                console.log("Album: " + spotifyResponse.items[i].album.name);
                console.log("Artist/s: " + spotifyResponse.items[i].artists[0].name);
                console.log("Preview URL: " + spotifyResponse.items[i].external_urls.spotify);
                console.log("-----------------------------");
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}


// If statement to run a function
if (action == "concert-this") {
    concertThis(term);
}
else if (action == "do-what-it-says") {
    doWhatItSays(term);
}
else if (action == "spotify-this-song") {
    spotifyThisSong(term);
}
else if (action == "movie-this") {
    movieThis(term);

}
else if (action == "do-what-it-says`") {
    var randomText = fs.readFileSync('random.text','utf8');
    console.log (randomText);
}













