var apiKey = '7uwcgjvfwhg6h468vquck77e';
var submitBtn = document.getElementById('submit');
var userInput = document.getElementById('zipcode');


//Create a function to pull in current and upcoming movie titles from API.
function getMovieTitles(movieTitles) {
        var url = 'http://data.tmsapi.com/v1.1/theatres?zip=80018&api_key=7uwcgjvfwhg6h468vquck77e'
    
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



// var apiKey = 'xeasuzyrgg7g2yyfhuyx68hs';
// var apiSecret = 'PdYnMACZx6';
// var submitBtn = document.getElementById('submit')
// var userInput = document.getElementById('zipcode')


// //Create a function to pull in current and upcoming movie titles from Fandango API.
// // function getMovieTitles(movieTitles) {
// //     var url = 'http://api.fandango.com/v1/?op=performancesbymoviepostalcodesearch&movieid=151500&postalcode=94105&apikey=xeasuzyrgg7g2yyfhuyx68hs&sig=4344f2d1dd312a76b88244ecb777f55482928617fd3fb66f707d92c3fadfe519?searchby=location'

// //     fetch(url).then(function (response) {
// //         return response.json();
// //     })

// //         .then(function (data) {

// //         })
// // }
// function handleUserInput() {
//     var zipcodeInput = userInput.value.trim();

// }
// getMovieLocations()

// //Create a function to pull in API movie theater data based on zipcode.
// function getMovieLocations(zipcode) {
//     // curl --get https://serpapi.com/search \
//     // -d q="AMC+Barton+Creek+Square+14" \
//     // -d location="Austin,+Texas,+United+States" \
//     // -d hl="en" \
//     // -d gl="us" \
//     // -d api_key="2d37e2ed559d68d45e99533ed46c9ce56ef4bac54941d3a9fbaa0c7b5c6f3ea6"

//     fetch('https://serpapi.com/search?q=AMC+Barton+Creek+Square+14&location=Austin,+Texas,+United+States&hl=en&gl=us&api_key=2d37e2ed559d68d45e99533ed46c9ce56ef4bac54941d3a9fbaa0c7b5c6f3ea6')
//     .then(function (response) {
//         return response.json();
//     }).then(function (data) {
//             console.log(data)
//         })
//     }


