const seachField = document.querySelector(".search-field");
const searchButton = document.querySelector(".search-button");
const weatherIcon = document.querySelector(".search-button");
const alert = document.querySelector(".alert");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const pressure = document.querySelector(".pressure");
const sunRise = document.querySelector(".sunrise-time");
const sunSet = document.querySelector(".sunset-time");

document.querySelector(".date-time").textContent = new Date().toDateString();

async function getWeather() {
  const res = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Varna&APPID=645f86c6102187bbf6a454b0111ca0a8"
  );
  const data = await res.json();
  console.log(
    new Date(parseInt(data.sys.sunset * 1000))
      .getHours()
      .toString()
      .padStart(2, "0"),
    new Date(parseInt(data.sys.sunset * 1000))
      .getMinutes()
      .toString()
      .padStart(2, "0")
  );
}

getWeather();
