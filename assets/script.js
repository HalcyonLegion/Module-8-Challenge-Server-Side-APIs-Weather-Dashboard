
// Grab key IDs and commit them for jQuery, get the API key loaded.
$(document).ready(function () {
    const apiKey = '82dc1b6895b734e330686061fc27b46f';
    const historyList = $('#history');
    const searchForm = $('#search-form');
    const searchInput = $('#search-input');
    const today = $('#today');
    const forecast = $('#forecast');

    // Get coordinates of a city from OpenWeatherMap, load the URL
    function fetchCoordinates(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
        // Async handling using Promise with 2 params - resolve for success, reject for failure.

        return new Promise((resolve, reject) => {
            $.get(url, (data) => {
              resolve(data);
            }).fail((error) => {
              reject(error);
            });
          });
        }
    
    // Gets the weather information based on the coordinates from earlier
    function fetchWeather(lat, lon) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    
        return new Promise((resolve, reject) => {
            $.get(url, (data) => {
              resolve(data);
            }).fail((error) => {
              reject(error);
            });
          });
        }
    
    // Function to update the history list with the name of the city.
    function updateHistoryList(cityName) {
        historyList.append(`<button class="list-group-item city-history">${cityName}</button>`);
    }

    //Function to convert the temperature to celcius
    function kelvinToCelsius(tempInKelvin) {
        return (tempInKelvin - 273.15).toFixed(2);
    }
    
    // Another function to display today's weather  
    function displayTodayWeather(data) {
    today.html(`
      <h2>${data.city.name} (${moment().format('MM/DD/YYYY')}) <img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png" width="50" height="50" /></h2>
      <p>Temperature : ${data.list[0].main.temp} °C</p>
      <p>Humidity : ${data.list[0].main.humidity} %</p>
      <p>Wind Speed : ${data.list[0].wind.speed} meter/sec</p>
    `);
    }


    // Function for the Forecast data

    function displayForecastWeather(data) {
        forecast.html('');
    
        for (let i = 1; i <= 5; i++) {
          const dayData = data.list[i * 8];
          forecast.append(`
            <div class="col-md-2 col-sm-4">
              <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
                <div class="card-header">${moment(dayData.dt_txt).format('DD/MM/YYYY')}</div>
                <div class="card-body">
                  <img src="https://openweathermap.org/img/wn/${dayData.weather[0].icon}.png" width="50" height="50" /><br>
                  Temp: ${dayData.main.temp}°C<br>
                  Humidity: ${dayData.main.humidity}%
                </div>
              </div>
            </div>
          `);
        }
    }

    //function here to display the weather based on the parts queried earlier
    function getAndDisplayWeather(cityName) {
        fetchCoordinates(cityName)
          .then(({ coord }) => {
            return fetchWeather(coord.lat, coord.lon);
          })
          .then((data) => {
            displayTodayWeather(data);
            displayForecastWeather(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      
      searchForm.on('submit', function (event) {
        event.preventDefault();
        const cityName = searchInput.val();
        updateHistoryList(cityName);
        getAndDisplayWeather(cityName);
      });

      historyList.on('click', 'button.city-history', function (event) {
        const cityName = $(this).text();
        getAndDisplayWeather(cityName);
      });
});