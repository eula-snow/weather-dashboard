var apiKey = "77d4eb011b9ab8b90b0c6086ad369f1b";
var searchButton = $(".search-button");
var searchInput = $("#search-input");
var today = $("#today");

// var queryURL =
//   "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
// fetch(queryURL);

//function to get the city from input
function search(event) {
  event.preventDefault();
  var city = searchInput.val();
  getWeather(city);
}

//function to display current weather
function displayCurrentWeather(currentObj) {
  $("#current").hide();
  today.append(`
        <div>
        <h3>${currentObj.name}</h3>
        <p>Temp: ${currentObj.main.temp}</p>
        <p>Wind: ${currentObj.wind.speed} KPH</p>
        <p>Humidity: ${currentObj.main.humidity}%</p>
</div>`);
}

function getWeather(city) {
  // fetch forecast for chosen city from server
  $.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  ).then(function (currentWeather) {
    // get current weather
    console.log(currentWeather);
    displayCurrentWeather(currentWeather);
  });
}

searchButton.click(search);
