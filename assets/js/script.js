var movieApiKey = '7uwcgjvfwhg6h468vquck77e';
var weatherApiKey = 'aea21397c6d9dfc11ba04ff29f0547e6';
var searchBtn = document.getElementById('cityDateBtn');
var userInputCity = document.getElementById('city_name');
var userInputDate = document.getElementById('date-picker');
var movieData = document.getElementById('movielist');


var searchHistory = [];

function handleUserInput() {
    var city = userInputCity.value
    var date = userInputDate.value

    getLatLon(date, city)
}

function getLatLon(date, city) {
    var url = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + weatherApiKey;
    fetch(url).then(function (response) {
        return response.json();
    })
        .then(function (data) {
            // create variables for lat, lon, cityname
            // console.log(data)
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
            movieData.innerHTML = ''
            // create the main div for our card
            var divContainer = document.createElement('div');
            var showtimeHeading = document.createElement('h2');

            //Set the attribute.
            divContainer.setAttribute('class', 'row hello')
            //Append
            divContainer.append(showtimeHeading)


            for (var i = 0; i < data.length; i++) {


                //Create variables for the API data call.
                var movieImageUrl = 'http://developer.tmsimg.com/' + data[i].preferredImage.uri + '?api_key=' + movieApiKey;
                // console.log(movieImageUrl);
                var summary = data[i].longDescription;
                var releaseDate = data[i].releaseDate;
                var directorArr = data[i].directors;
                var topCastArr = data[i].topCast;
                var runTime = data[i].runTime;
                var ratingArr = data[i].ratings;
                var rating;

                if (ratingArr) {
                    rating = data[i].ratings[0].code;
                } else {
                    rating = 'NR'
                }
                var genreArr = data[i].genres;
                // will need to loop showtimes before we can get the theater name
                var showtimeArr = data[i].showtimes;
                var movieName = data[i].title;

                
                

                //Create the elements for the theater name and the showtime buttons.
                var theaterNameEl = document.createElement('p');
                showtimeHeading.textContent = 'Showtimes: '
                for (var m = 0; m < showtimeArr.length; m++) {

                    //Create the elements in the showtimes container.
                    var showtimeContainer = document.createElement('div');
                    var theaterContainer = document.createElement('div');
                    var movieTheaterDiv = document.createElement('div');
                    var showtimeButtonContainer = document.createElement('div');

                    //Set the attributes for the elements.
                    showtimeButtonContainer.setAttribute('class', 'row')
                    showtimeContainer.setAttribute('class', 'col m4 showtime')

                    //Must filter the data in order for the showtimes and theater name to show together.
                    const filteredArray = showtimeArr.filter(function (item) {
                        return showtimeArr[m].theatre.name === item.theatre.name
                    })
                    console.log(filteredArray);

                    //Must create a for loop to show all showtimes for all movie theaters.
                    for (var p = 0; p < filteredArray.length; p++) {
                        //Create variable to link the theater name with the showtimes
                        var showtimeHour = showtimeArr[p].dateTime
                        var showtimeMin= showtimeArr[p].dateTime
                        showtimeHour = showtimeHour.substring(11,showtimeHour.length -3)
                        showtimeMin = showtimeMin.substring(14,showtimeMin.length)

                        // showtimeHour = ((showtimeHour + 11) % 12 +1);
                        if(showtimeHour === '13'){
                            showtimeHour= "1"
                        }else if(showtimeHour === '14'){
                            showtimeHour= "2"
                        }else if(showtimeHour === '15'){
                        showtimeHour= "3"
                    }else if(showtimeHour === '16'){
                        showtimeHour= "4"
                    }else if(showtimeHour === '17'){
                        showtimeHour= "5"
                    }else if(showtimeHour === '18'){
                        showtimeHour= "6"
                    }else if(showtimeHour === '19'){
                        showtimeHour= "7"
                    }else if(showtimeHour === '20'){
                        showtimeHour= "8"
                    }else if(showtimeHour === '21'){
                        showtimeHour= "9"
                    }else if(showtimeHour === '22'){
                        showtimeHour= "10"
                    }else if(showtimeHour === '23'){
                        showtimeHour= "11"
                    }else if(showtimeHour === '0'){
                        showtimeHour= "12"
                    }

                        var theaterName = showtimeArr[p].theatre.name

                        //Element created for the showtime buttons.
                        var showtimeBtn = document.createElement('a');
                        //Create the attributes for the showtime buttons, links in the buttons and open in a new broweser tab once the button/link is selected.
                        showtimeBtn.setAttribute('class', 'waves-effect waves-light btn-small')
                        if (showtimeArr[p].ticketURI) {
                            showtimeBtn.setAttribute('href', showtimeArr[p].ticketURI)
                        } else {
                            var ticketAlert = document.createElement('p')
                            showtimeBtn.setAttribute('class', 'waves-effect waves-light btn-small red')
                            ticketAlert.textContent = '***Tickets cannot be purchased online for this Movie'
                            showtimeButtonContainer.append(ticketAlert)
                        }

                        showtimeBtn.setAttribute('target', '_blank')
                        //Set content for the theater name and showtimes.
                        theaterNameEl.textContent = theaterName

                        showtimeBtn.textContent = showtimeHour + ':'+ showtimeMin + 'pm'
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
                imgEl.setAttribute('alt', movieName + ' poster')
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



                movieData.append(divContainer)
            }



        })
}


searchBtn.addEventListener('click', handleUserInput);






