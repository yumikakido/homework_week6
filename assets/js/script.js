// OpenWeather API key
const API_KEY = '6b5e2290428c5d8561168d459aef38d5'; 

// Selectors for HTML elements
var cityEl = $('#city-name-and-date');
var firstDayEl = $('.first-day');
var secondDayEl = $('.second-day');
var thirdDayEl = $('.third-day');
var fourthDayEl = $('.fourth-day');
var fifthDayEl = $('.fifth-day');
var todaysWeatherIconEl = $('.todays-weather-icon');
var firstDayWeatherIconEl = $('.first-day-weather-icon');
var secondDayWeatherIconEl = $('.second-day-weather-icon');
var thirdDayWeatherIconEl = $('.third-day-weather-icon');
var fourthDayWeatherIconEl = $('.fourth-day-weather-icon');
var fifthDayWeatherIconEl = $('.fifth-day-weather-icon');

var todaysTempEl = $('.todays-temperature');
var todaysWindEl = $('.todays-wind');
var todaysHumidityEl = $('.todays-humidity');
var uvEl = $('.uv');
var historyEl = $('#city-list');

// Selectors for form elements
var inputCity = $('#input-city');

// Store searched city
var searchedCities = [];

// Display today's weather
function callApi(cityName) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`, requestOptions)
        .then(response => response.json())
        .then(
            responseData => { console.log(responseData); return responseData })
        .catch(error => console.log('error', error))
}

// Display 5 day forecast
function get5DayForecast(latitude, longitude) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`, requestOptions)
        .then(
            response => response.json()
        )
        .then(
            responseData => {
                console.log(responseData)
                return responseData
            }
        )
        .catch(error => console.log('error', error));
}

function callApiAndUpdateText(city) {
    callApi(city)
        .then(
            apiResponse => {
                cityEl.text(apiResponse.name + " " + '(' + moment(apiResponse.dt * 1000).format('L') + ')');
                todaysWeatherIconEl.attr("src", `https://openweathermap.org/img/wn/${apiResponse.weather[0].icon}.png`)
                todaysTempEl.text('Temp: ' + apiResponse.main.temp + ' °F');
                todaysWindEl.text('Wind: ' + apiResponse.wind.speed + ' MPH');
                todaysHumidityEl.text('Humidity: ' + apiResponse.main.humidity + ' %');
                uvEl.html("<span class='uv'>UV Index: </span><button style='pointer-events: none;' type='button' class='uv btn btn-success'>0.41 (Deprecated)</button>")
                get5DayForecast(apiResponse.coord.lat, apiResponse.coord.lon)
                    .then(
                        get5DayForecastResponse => {
                            var lol = $('.haha')

                            var days = [7, 14, 21, 28, 37]
                            var text = ''

                            for (let i = 0; i < days.length; i++) {
                                var theDay = get5DayForecastResponse.list[days[i]]
                                text = text + `
                                 <div class="d-flex justify-content-around m-2">
                                    <div class="card">
                                    <div class="card-body">
                                        <p class="first-day">${moment(theDay.dt * 1000).format('L')}</p>
                                        <img class="first-day-weather-icon" src="https://openweathermap.org/img/wn/${theDay.weather[0].icon}.png">
                                        <p class="first-day-temp">${'Temp: ' + theDay.main.temp + ' °F'}</p>
                                        <p class="first-day-wind">${'Wind: ' + theDay.wind.speed + ' MPH'}</p>
                                        <p class="first-day-humid">${'Humidity: ' + theDay.main.humidity + ' °F'}</p>
                                    </div>
                                    </div>
                                </div>
                                `
                            }
                            lol.html(text)
                        }
                    )
            }
        )
}


// Search weather 
$('#search-btn').on('click', function (event) {

    // Prevent it from submitting the form
    event.preventDefault();

    var city = inputCity.val().trim();
    historyEl.append(`<li><button type="button" class="btn ${city}">${city}</button></li><p></p>`);

    $(`.${city}`).on('click', function (event) {
        event.preventDefault(); // To prevent following the link (optional)
        callApiAndUpdateText(city)
    });

    callApiAndUpdateText(city)
    inputCity.val('');

})




