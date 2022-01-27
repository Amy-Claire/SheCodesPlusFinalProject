// curent date and time

let currentTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[currentTime.getDay()];
let currentHour = currentTime.getHours();
let currentMinutes = currentTime.getMinutes();

let formattedDate = `${currentDay} ${currentHour}:${currentMinutes}`;
console.log(formattedDate);

let dayTime = document.querySelector("#current-time");

dayTime.innerHTML = `${formattedDate}`;

// search for a city

function showTemperature(response) {
  console.log(response.data);
  document.querySelector("#currently").innerHTML = response.data.name;
  document.querySelector("#maintemp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#high").innerHTML = Math.round(
    response.data.main.temp_max
  );

  document.querySelector("#low").innerHTML = Math.round(
    response.data.main.temp_min
  );
}
function search(city) {
  let apiKey = "87dc4488da44997e9f2d7508fea3a12a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  document.querySelector("#currently").innerHTML = `${city} is currently`;
  search(city);
}

// get current location

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "87dc4488da44997e9f2d7508fea3a12a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function geolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", geolocation);
navigator.geolocation.getCurrentPosition(showPosition);

// convert to c or f

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureUnit = document.querySelector("#maintemp");
  temperatureUnit.innerHTML = 24;
}

function convertToFahenheit(event) {
  event.preventDefault();
  let temperatureUnit = document.querySelector("#maintemp");
  temperatureUnit.innerHTML = 75;
}

let fahrenheitConvert = document.querySelector("#fahrenheit-link");
fahrenheitConvert.addEventListener("click", convertToFahenheit);

let celciusConvert = document.querySelector("#celcius-link");
celciusConvert.addEventListener("click", convertToCelcius);

//

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);

search("New York");
