function formatDate(timestamp) {
  let dateNow = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dateNow.getDay()];
  let hours = dateNow.getHours();
  let minutes = dateNow.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function getWeather(response) {
  let degreesNow = document.querySelector("#degrees");
  let cityName = document.querySelector("#cityName");
  let conditionNow = document.querySelector("#condition");
  let humidityNow = document.querySelector("#humidity");
  let windSppedNow = document.querySelector("#wind");
  let dateNow = document.querySelector("#date");
  let iconNow = document.querySelector("#icon-weather");

  celsiusTemperature = response.data.temperature.current;

  degreesNow.innerHTML = Math.round(celsiusTemperature);
  cityName.innerHTML = response.data.city;
  conditionNow.innerHTML = response.data.condition.description;
  humidityNow.innerHTML = response.data.temperature.humidity;
  windSppedNow.innerHTML = Math.round(response.data.wind.speed);
  dateNow.innerHTML = formatDate(response.data.time * 1000);
  iconNow.setAttribute("src", `images/${response.data.condition.icon}.png`);
  iconNow.setAttribute("alt", response.data.condition.icon);
}

function search(city) {
  let apiKey = "3067ad58ftc207dfda0420dfbobd0b23";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}

function submitCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  search(searchInput.value);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let degreesNow = document.querySelector("#degrees");
  degreesNow.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let degreesNow = document.querySelector("#degrees");
  degreesNow.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

search("Berlin");
