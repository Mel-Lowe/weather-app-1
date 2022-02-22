let now = new Date();
let currentDate = document.querySelector("#current-date");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let mins = now.getMinutes();
if (mins < 10) {
  mins = `0${mins}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

currentDate.innerHTML = `${day} ${hours}:${mins}`;

function displayWeather(response) {
  console.log(response.data.name);
  document.querySelector("#city-text").innerHTML = response.data.name;
  document.querySelector("#temp-text").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector(".weather-description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "485b9870f76954f7a4f26ef36fc9aa1d";
  let city = document.querySelector("#city-search").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function convertToFarenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp-text");
  let temperature = tempElement.innerHTML;
  tempElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCity);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", convertToFarenheit);
