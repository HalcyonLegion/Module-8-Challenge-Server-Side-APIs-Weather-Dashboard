
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