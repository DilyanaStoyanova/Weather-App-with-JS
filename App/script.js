let date = document.querySelector(".date");
let time = document.querySelector(".time");

const weatherCard = document.querySelector(".weather-card");
const themeButton = document.querySelector(".theme");
const searchForm = document.querySelector(".search");
const content = document.querySelector(".content");
const searchField = document.querySelector(".search-field");
const weatherIcon = document.querySelector(".weather-icon");
const shortDesc = document.querySelector(".short-desc");
const message = document.querySelector(".message");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const pressure = document.querySelector(".pressure");
const sunRise = document.querySelector(".sunrise-time");
const sunSet = document.querySelector(".sunset-time");
const errorMessage = document.querySelector(".error-message");
const popup = document.querySelector(".popup");
const history = document.querySelector(".history");

updateClock();

setInterval(updateClock, 1000);

let cityName;
const cities = [];

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  cityName = searchField.value.toLowerCase().trim();
  popup.style.display = "none";
  content.style.opacity = 100;

  getWeather();
});

async function getWeather() {
  const key = "645f86c6102187bbf6a454b0111ca0a8";
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&APPID=${key}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw Error(res.statusText);
    }

    const data = await res.json();

    const name = `${data.name}, ${data.sys.country}`;
    const msg = data.weather[0].description;
    const temperature = `${Math.round(data.main.temp)}°C`;

    displayHistory(name, msg, temperature);

    shortDesc.textContent = data.weather[0].main;
    message.textContent = msg;
    city.textContent = name;
    temp.textContent = temperature;
    weatherIcon.src = `img/${data.weather[0].icon}.svg`;
    humidity.textContent = `${data.main.humidity.toFixed(0)}%`;
    wind.textContent = `${data.wind.speed.toFixed(0)} km/h`;
    pressure.textContent = `${data.main.pressure.toFixed(0)} hPa`;
    sunRise.textContent = formattedDate(data.sys.sunrise);
    sunSet.textContent = formattedDate(data.sys.sunset);

    searchField.value = "";
  } catch (error) {
    popup.style.display = "block";
    content.style.opacity = 0;
    errorMessage.textContent = `${cityName} ${error.message}. Please try again...`;
  }
}

function updateClock() {
  const now = new Date();

  const hours = `${now.getHours()}`.padStart(2, 0);
  const minutes = `${now.getMinutes()}`.padStart(2, 0);
  const seconds = `${now.getSeconds()}`.padStart(2, 0);

  date.textContent = now.toDateString();
  time.textContent = `${hours}:${minutes}:${seconds}`;
}

themeButton.addEventListener("click", () => {
  weatherCard.classList.toggle("dark");
  if (weatherCard.classList.contains("dark")) {
    themeButton.innerHTML = `<i class="far fa-sun"></i>`;
  } else {
    themeButton.innerHTML = `<i class="fas fa-moon"></i>`;
  }
});

function displayHistory(name, message, temperature) {
  const html = `
  <li>
  &rarr; ${name}, ${temperature} ${message}
  </li>
  `;
  history.insertAdjacentHTML("afterbegin", html);
}

function formattedDate(data) {
  const hours = `${new Date(data * 1000).getHours()}`.padStart(2, 0);

  const minutes = `${new Date(data * 1000).getMinutes()}`.padStart(2, 0);

  return `${hours}:${minutes}`;
}
