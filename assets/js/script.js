var apiKey = '7uwcgjvfwhg6h468vquck77e';
var searchBtn = document.getElementById('search');
var userInputCity = document.getElementById('city');
var userInputDate = document.getElementById('date');
var date ='2022-09-26';

var searchHistory = [];

//Create a function to pull in current and upcoming movie titles from API.
function start(movieTitles) {
    var url = 'http://data.tmsapi.com/v1.1/movies/showings?startDate=' + date + '&lat='+ lat +'&lng='+ lon + '&api_key=7uwcgjvfwhg6h468vquck77e';

    fetch(url).then(function (response) {
        return response.json();
    })

        .then(function (data) {
            console.log(data);
        })
        //Create variables for the API data call.
        var movieImage = data.preferredImage;
        var summary = data.longDescrioption;
        var releaseDate = data.ratings[0].releaseDate;
        var director = data.directors;
        var topCast = data.topCast;
        var runTime = data.ratings[0].runTime;
        var rating = data.ratings[0].code;
        var theaterName = data.showtimes[0].theatre.name;
        var time = data.ratings[0].runTime;

        //Create the elements for the movie data.
        var movieImageEl = ('img');
        var summaryEl = ('p');
        var releaseDateEl = ('p');
        var directorEl = ('p');
        var topCastEl = ('p');
        var runTimeEl = ('p');
        var ratingEl = ('p');
        var theaterNameEl = ('p');
        var timeEl = ('p');

        //Set attributes for the elements.

    
}




start();

//Create a function that handles the user input(city & date) to local storage.
function saveToLocalStorage(cityAndDate) {
    //Check for duplicate entries in search.
    if (searchHistory.indexOf(cityAndDate) !== -1) {
    }
    //Push city and date search history to the searchHistory array.
    searchHistory.push(cityAndDate);
    //Save search history array into local storage.
    localStorage.setItem('searchHistory', JSON.stringify('searchHistory'));
    saveHistoryButtons();
}

//Function to retrieve saved data in local storage.
function retrieveLocalStorage() {
    var history = localStorage.getItem('searchHistory');
    if (history) {
        searchHistory = JSON.parse(history)
    }
    saveHistoryButtons();
}
retrieveLocalStorage();

//Function to provide the functionality of the search history buttons.
function saveHistoryButtons() {

}

