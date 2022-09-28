var movieApiKey = '7uwcgjvfwhg6h468vquck77e';
var weatherApiKey = 'aea21397c6d9dfc11ba04ff29f0547e6';
var searchBtn = document.getElementById('cityDateBtn');
var userInputCity = document.getElementById('city');
var userInputDate = document.getElementById('date');
var movieData = document.getElementById('movielist');
var userDate = '2022-10-04';

var searchHistory = [];

function handleUserInput() {

    getLatLon(userDate, 'Aurora')
}

function getLatLon(date, city) {
    var url = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + weatherApiKey;
    fetch(url).then(function (response) {
        return response.json();
    })
        .then(function (data) {
            // create variables for lat, lon, cityname
            console.log(data)
            var lat = data[0].lat
            var lon = data[0].lon
            start(date, lat, lon)
        })
}

//Create a function to pull in current and upcoming movie titles from API.
function start(date, lat, lon) {
    var url = 'http://data.tmsapi.com/v1.1/movies/showings?startDate=' + date + '&lat=' + lat + '&lng=' + lon + '&api_key=7uwcgjvfwhg6h468vquck77e';

    fetch(url).then(function (response) {
        return response.json();
    })

        .then(function (data) {
            console.log("original data!!", data);
            // create the main div for our card

            var divContainer = document.createElement('div');



            divContainer.setAttribute('class', 'row hello')
            var showtimeHeading = document.createElement('h2');
            divContainer.append(showtimeHeading)



            for (var i = 0; i < data.length; i++) {


                //Create variables for the API data call.
                var movieImageUrl = 'http://developer.tmsimg.com/' + data[i].preferredImage + '?api_key=' + movieApiKey;
                var summary = data[i].longDescription;
                var releaseDate = data[i].releaseDate;
                // will need a for loop
                var directorArr = data[i].directors;
                // will need a for loop
                var topCastArr = data[i].topCast;
                var runTime = data[i].runTime;

                var ratingArr = data[i].ratings;
                var rating;

                if (ratingArr) {
                    rating = data[i].ratings[0].code;
                } else {
                    rating = 'NR'
                }

                // will need a for loop
                var genreArr = data[i].genres;
                // will need to loop showtimes before we can get the theater name
                var showtimeArr = data[i].showtimes;
                var movieName = data[i].title;


                //Create a loop to loop through the data in order to get the showtimes.

                showtimeHeading.textContent = 'Showtimes: '
                for (var m = 0; m < showtimeArr.length; m++) {
                    //Create the elements in the showtimes container.
                    var showtimeContainer = document.createElement('div');

                    var theaterContainer = document.createElement('div');
                    var movieTheaterDiv = document.createElement('div');

                    var showtimeButtonContainer = document.createElement('div');
                    showtimeButtonContainer.setAttribute('class', 'row')
                    showtimeContainer.setAttribute('class', 'col m4 showtime')
                    //Must filter the data in order for the showtimes and theater name to show together.
                    const filteredArray = showtimeArr.filter(function (item) {
                        return showtimeArr[m].theatre.name === item.theatre.name
                    })

                    //Must create a for loop to show all showtimes for all movie theaters.
                    for (var p = 0; p < filteredArray.length; p++) {
                        var showtimeHour = showtimeArr[p].dateTime
                        //Create variable to link the theater name with the showtimes
                        var theaterName = showtimeArr[m].theatre.name
                       
                        //Create the elements for the theater name and the showtime buttons.
                        var theaterNameEl = document.createElement('p');

                        var showtimeBtn = document.createElement('a');
                        //Create the attributes for the showtime buttons, links in the buttons and open in a new broweser tab once the button/link is selected.
                        showtimeBtn.setAttribute('class', 'waves-effect waves-light btn-small')
                        showtimeBtn.setAttribute('href', showtimeArr[p].ticketURI)
                        showtimeBtn.setAttribute('target', '_blank')
                        //Set content for the theater name and showtimes.
                        theaterNameEl.textContent = theaterName

                        showtimeBtn.textContent = showtimeHour
                        //Append the theater names and showtime buttons to the showtime container.
                        showtimeButtonContainer.append(showtimeBtn)
                        movieTheaterDiv.append(theaterNameEl, showtimeButtonContainer)
                    }


                }
                //Create the elements for the movie data from the HTML.
                var movieDetailDiv = document.createElement('div');
                var moviesubdiv = document.createElement('div');
                var movieOuterCard = document.createElement('div');
                var movieCard = document.createElement('div');
                var movieImgDiv = document.createElement('div');
                var imgEl = document.createElement('img')
                var cardStackedEl = document.createElement('div');
                var cardContent = document.createElement('div');
                var movieTitle = document.createElement('h5');
                var movieDescrp = document.createElement('p');
                var releaseDateEl = document.createElement('p');
                var directorEl = document.createElement('p');
                var topCastEl = document.createElement('p');
                var runTimeEl = document.createElement('p');
                var genreEl = document.createElement('p');
                var ratingEl = document.createElement('p');

                //Set the attributes for the movie data.
                movieDetailDiv.setAttribute('class', 'col m8 dude')
                movieOuterCard.setAttribute('class', 'col m12 m7')
                movieCard.setAttribute('class', 'card horizontal')
                movieImgDiv.setAttribute('class', 'card-image')
                imgEl.setAttribute('src', movieImageUrl)
                cardStackedEl.setAttribute('class', 'card-stacked')
                cardContent.setAttribute('class', 'card-content')

                //Create the text for the movie data elements.
                movieTitle.textContent = movieName;
                movieDescrp.textContent = summary;
                releaseDateEl.textContent = 'Release Date: ' + releaseDate;
                directorEl.textContent = 'Directors: ' + directorArr; 
                topCastEl.textContent = 'Top Cast: ' + topCastArr;
                runTimeEl.textContent = 'Run Time: ' + runTime;
                genreEl.textContent = 'Genre: ' + genreArr;
                ratingEl.textContent = 'Rating: ' + rating;

                //Append the movie data to the site movie data card.
                cardContent.append(movieTitle, movieDescrp, releaseDateEl, directorEl, topCastEl, runTimeEl, genreEl, ratingEl)
                cardStackedEl.append(cardContent)
                movieImgDiv.append(imgEl)
                movieCard.append(movieImgDiv, cardStackedEl)
                movieOuterCard.append(movieCard)
                moviesubdiv.append(movieOuterCard)
                movieDetailDiv.append(moviesubdiv)

                //Append movie data containers.
                theaterContainer.append(movieTheaterDiv)
                showtimeContainer.append(theaterContainer)
                divContainer.append(showtimeContainer, movieDetailDiv)


                // for (var l = 0; l < genreArr.length; l++) {


                // }

                // for (var k = 0; k < topCastArr.length; k++) {


                // }

                // for (var j = 0; j < directorArr.length; j++) {





                movieData.append(divContainer)
            }


            
        })
}


searchBtn.addEventListener('click', handleUserInput);



//Create a function that handles the user input(city & date) to local storage.
// function saveToLocalStorage(cityAndDate) {
    //Check for duplicate entries in search.
//     if (searchHistory.indexOf(cityAndDate) !== -1) {
//     }
//     //Push city and date search history to the searchHistory array.
//     searchHistory.push(cityAndDate);
//     //Save search history array into local storage.
//     localStorage.setItem('searchHistory', JSON.stringify('searchHistory'));
//     saveHistoryButtons();
// }

// //Function to retrieve saved data in local storage.
// function retrieveLocalStorage() {
//     var history = localStorage.getItem('searchHistory');
//     if (history) {
//         searchHistory = JSON.parse(history)
//     }
//     saveHistoryButtons();
// }
// retrieveLocalStorage();

// //Function to provide the functionality of the search history buttons.
// function saveHistoryButtons() {

// }


