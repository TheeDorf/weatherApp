const weatherSite = "https://api.openweathermap.org/data/2.5/weather";

const apiKey = "ee329596df76a835cfef822c61b16a6a";

const locationInput = document.querySelector("#location");
const weatherDisplay = document.querySelector("#weather");
const tempToggle = document.querySelector("#temp-toggle");
const savedAreasList = document.querySelector("#saved-areas");
const saveAreaButton = document.querySelector("#save-area");
const removeAreaButton = document.querySelector("#remove-area");

let currentLocation = "";
let currentData;
let currentUnit = "imperial";
let savedAreas = [];

async function fetchWeatherData(location) {
  const url = `${weatherSite}?q=${currentLocation}&units=${currentUnit}&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
}
fetchWeatherData()
console.log("show data")
function processWeatherData(data) {
  const processedData = {
    location: data.name,
    temperature: data.main.temp,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    time: new Date(data.dt * 1000).toLocaleTimeString(),
  };
  return processedData;
}

function displayWeatherData(data) {
  const { location, temperature, description, icon, time } = data;
  const html = `
    <h2>${location}</h2>
    <p>${description}</p>
    <img src="https://openweathermap.org/img/w/${icon}.png" alt="${description}">
    <p>${temperature}°${currentUnit === "imperial" ? "F" : "C"}</p>
    <p>Last updated at ${time}</p>
    `;
  weatherDisplay.innerHTML = html;
}

function toggleTemperatureUnits() {
  currentUnit = currentUnit === "imperial" ? "metric" : "imperial";
  if (currentData) {
    displayWeatherData(currentData);
  }
}

function saveLocationAsSavedArea() {
  if (currentLocation && !savedAreas.includes(currentLocation)) {
    const li = document.createElement("li");
    li.textContent = currentLocation;
    savedAreasList.appendChild(li);
  }
}

function removeLocationFromSavedAreas() {
  const index = savedAreas.indexOf(currentLocation);
  if (index !== -1) {
    savedAreas.splice(index, 1);
    const li = savedAreasList.querySelector(`li:nth-of-type(${index + 1})`);
    savedAreasList.removeChild(li);
  }
}
