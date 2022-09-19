// OpenWeather API key
const apiKey = 'b40315888b2be2a116dda813b0a9e846';

function getSearchedCities() {

    return JSON.parse(localStorage.getItem("cities")) || [];
}

$(function(){
    // get the last item in the history
    const lastCitySearched = getSearchedCities().slice(-1)[0];
    // display the weather data
    // if lastSearched is undefined, return nothing
    if(!lastCitySearched) {
        return;
    }
    showWeather(lastCitySearched);
});

function getWeatherApi(city){

    // Call the current api to get lon and lat
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city} &appid=${apiKey}`)
    .then(function(response){
        return response.json()
    })
    .then(function(result){
        //console.log('current', result)
        return{
                lon: result.coord.lon,
                lat: result.coord.lat,
            }
        })
    .then(function(result){
        console.log(result);
         // Call the one call api to get the rest of the info 
        return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${result.lat}&lon=${result.lon}&appid=${apiKey}`)

    })
    .then(function(result){
        return result.json();
    })
    .then(function(onecallResutl){
        console.log('onecall', onecallResutl)
    })


}


function showWeather(city) {
    getWeatherApi(city)
    .then(function(result){
        //show today's weather
        result.current

        //show forecast

    })
}

// if the city is valid, add the city to history

// add the city to the sidebar

// when user type in duplicated city, reorder the ranking and move the searched city to the first 
