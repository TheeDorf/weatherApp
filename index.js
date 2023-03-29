const weatherSite = "https://api.openweathermap.org/data/2.5/weather";

const apiKey = "ee329596df76a835cfef822c61b16a6a";

const locationInput = document.querySelector("#location");
const weatherDisplay = document.querySelector("#weather");
const tempToggle = document.querySelector("#temp-toggle");
const savedAreasList = document.querySelector("#saved-areas");
const saveAreaButton = document.querySelector("#save-area");
const removeAreaButton = document.querySelector("#remove-area");
const shown = document.getElementById("shown");
const checkbox = document.getElementById("saveLocation");

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
    savedAreas.push(currentLocation);
    const li = document.createElement("li");
    li.textContent = currentLocation;
    console.log(li);
    console.log(savedAreas);
    shown.appendChild(li);
  }
}

function removeLocationFromSavedAreas() {
  const index = savedAreas.indexOf(currentLocation);
  if (index !== -1) {
    savedAreas.splice(index, 1);
    const li = savedAreasList.querySelector(`(${index + 1})`);
    savedAreasList.removeChild(li);
  }
}

document.querySelector("form").addEventListener("submit", async(event)=>{
    event.preventDefault();
    const location = locationInput.value;
    currentLocation = location;
    try{
        const data = await fetchWeatherData(location);
        const processedData = processWeatherData(data);
        currentData = processedData;
        displayWeatherData(processedData);

    }catch (error){
        console.log(error);
        weatherDisplay.textContent = "error getting weather data";
    }
    if (checkbox.checked){

        saveLocationAsSavedArea(currentLocation);
    }
});

// tempToggle.addEventListener("click", toggleTemperatureUnits);