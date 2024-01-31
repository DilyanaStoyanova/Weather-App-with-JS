let date = document.querySelector(".date");
let time = document.querySelector(".time");

const body = document.querySelector("body");
const themeButton = document.querySelector(".theme");
const searchForm = document.querySelector(".search");
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

updateClock();

setInterval(updateClock, 1000);

let cityName = "Varna";
getWeather();

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  cityName = searchField.value;
  popup.style.display = "none";
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

    weatherIcon.src = `img/${data.weather[0].icon}.svg`;
    shortDesc.textContent = data.weather[0].main;
    message.textContent = data.weather[0].description;
    city.textContent = `${data.name}, ${data.sys.country}`;
    temp.textContent = `${Math.round(data.main.temp)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} km/h`;
    pressure.textContent = `${data.main.pressure} hPa`;
    sunRise.textContent = parseDate(data.sys.sunrise);
    sunSet.textContent = parseDate(data.sys.sunset);

    searchField.value = "";
  } catch (error) {
    popup.style.display = "block";
    errorMessage.textContent = `${cityName} ${error.message}. Please try again...`;
  }
}

function updateClock() {
  const now = new Date();

  const hours = stringDate(now.getHours());
  const minutes = stringDate(now.getMinutes());
  const seconds = stringDate(now.getSeconds());

  date.textContent = now.toDateString();
  time.textContent = `${hours}:${minutes}:${seconds}`;
}

themeButton.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    themeButton.innerHTML = `<i class="far fa-sun"></i>`;
  } else {
    themeButton.innerHTML = `<i class="fas fa-moon"></i>`;
  }
});

function parseDate(data) {
  const hours = stringDate(new Date(parseInt(data * 1000)).getHours());

  const minutes = stringDate(new Date(parseInt(data * 1000)).getMinutes());

  return `${hours}:${minutes}`;
}

function stringDate(data) {
  return data.toString().padStart(2, "0");
}
