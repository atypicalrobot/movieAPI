var source   = $('#entry-template').html();  // load the template from index.html
var template = Handlebars.compile(source);   // compile the template in js
var api_key = "0bc1e253597b90a61225cfa0988842d9"  // store api key as a variable

function displayMovies(movies, callerfunc){  // create function to display movies using above compiled template,
    for(var i = 0; i < movies.length; i++) {  // for each movie in movies array

        var context = movies[i]  // set context for template to current movie
        context.callerfunc = callerfunc; // callerfunc is set to a string representing the calling function e.g.latest
        var html    = template(context);  // generate html by passing context to the compiled template
        document.getElementById("mainBody").innerHTML += html;  // add the generated html to the page

        console.log(context);  // display JSON in console
    }
}

$(document).ready(function() {  // wait for all DOM elements to load
    getLatest();  // load latest films
});

function getLatest() {  // handles fetching movies from the now playing API endpoints
    document.getElementById("mainBody").innerHTML = "<h1> Now Playing </h1>";  // initial html for latest page
    $.getJSON("http://api.themoviedb.org/3/movie/now_playing?api_key=" + api_key, function(json) {  // make the API request
        displayMovies(json.results, "latest");  // use display function to display results 
    });
}

function searchMovies() {  // create function to search movies
    document.getElementById("mainBody").innerHTML = "<h1> Search results </h1>"; // initial html for search results page
    var search = document.getElementById("search").value;  // store seach query as a variable
    $.getJSON("https://api.themoviedb.org/3/search/movie?query=" + search + "&api_key=" + api_key, function(json) {  // make the API request
        displayMovies(json.results, "query");  // use display function to display results
    });
}


