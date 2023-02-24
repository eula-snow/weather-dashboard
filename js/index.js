var apiKey = "77d4eb011b9ab8b90b0c6086ad369f1b";
var searchButton = $(".search-button");
var searchInput = $("#search-input");
var today = $("#today");
var forecast = $("#forecast");
var history = $("#history");

// var queryURL =
//   "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
// fetch(queryURL);

//function to get the city from input
function search(event) {
  event.preventDefault();
  var city = searchInput.val();

  console.log("search: ");
  console.log(city);
  updateSearchHistory(city);
  displaySearchHistory();

  getWeather(city);
}

//function to display current weather
function displayCurrentWeather(currentObj) {
  today.html("");
  today.append(`
        <div>
        <h3>${currentObj.name} <img src='${
    "https://openweathermap.org/img/w/" + currentObj.weather[0].icon
  }.png'></h3>
        
        <p>Temp: ${currentObj.main.temp} °C</p>
        <p>Wind: ${currentObj.wind.speed} KPH</p>
        <p>Humidity: ${currentObj.main.humidity}%</p>
</div>`);
}

//function to display 5 day forecast
function displayForecast(futureObj) {
  $("#forecast").html(""); //clears the data
  for (var i = 0; i < futureObj.length; i += 8) {
    $("#forecast").append(`
        <div class="forecastBlock">
        <p></p>
        <img src='${
          "https://openweathermap.org/img/w/" + futureObj[i].weather[0].icon
        }.png'>
              <p>Temp: ${futureObj[i].main.temp} <span>&#176;</span>C</p>
              <p>Wind: ${futureObj[i].wind.speed} KPH</p>
              <p>Humidity: ${futureObj[i].main.humidity}%</p>  
        </div>     
`);
  }
}

function getWeather(city) {
  // fetch forecast for chosen city from server
  $.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  ).then(function (currentWeather) {
    // get current weather
    console.log(currentWeather);
    displayCurrentWeather(currentWeather);
    $.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${currentWeather.coord.lat}&lon=${currentWeather.coord.lon}&appid=${apiKey}&units=metric`
    ).then(function (fiveDayWeather) {
      //get 5 day forecast
      console.log(fiveDayWeather);
      displayForecast(fiveDayWeather.list);
    });
  });
}

//function that adds city to localStorage
function updateSearchHistory(city) {
  // get json string containing the array of cities
  var citiesStr = localStorage.getItem("cities");
  var citiesArr = citiesStr != null ? JSON.parse(citiesStr) : [];
  if (citiesArr.includes(city)) {
    return false;
  }
  citiesArr.push(city); //adds new value to the array
  localStorage.setItem("cities", JSON.stringify(citiesArr)); //converts array in string and adds to localStorage
  return true;
}

//function that displays search history as buttons
function displaySearchHistory() {
  $("#history").html("");

  var citiesStr = localStorage.getItem("cities");
  var citiesArr = citiesStr != null ? JSON.parse(citiesStr) : [];

  for (const city of citiesArr) {
    $("#history").append(`
  <button class='btn citySearch' onClick=getWeather('${city}') >${city}</button>
  `);
  }
}

searchButton.click(search);
displaySearchHistory();
