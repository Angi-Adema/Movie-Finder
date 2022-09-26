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
        var movie = 
        var summary =
        var releaseDate =
        var director =
        var topCast = 
        var runTime =
        var rating =
    
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


