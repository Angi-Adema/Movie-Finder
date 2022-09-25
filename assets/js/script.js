var apiKey = '7uwcgjvfwhg6h468vquck77e';
var submitBtn = document.getElementById('submit');
var userInput = document.getElementById('zipcode');
var date ='2022-09-26';

//Create a function to pull in current and upcoming movie titles from API.
function start(movieTitles) {
    var url = 'http://data.tmsapi.com/v1.1/movies/showings?startDate=' + date + '&lat='+ lat +'&lng='+ lon + '&api_key=7uwcgjvfwhg6h468vquck77e';

    fetch(url).then(function (response) {
        return response.json();
    })

        .then(function (data) {
            console.log(data);
        })

    // function handleUserInput() {
    //     var zipcodeInput = userInput.value.trim();

    // }
    // getMovieLocations()
}




start();




