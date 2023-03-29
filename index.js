const weatherSite = "https://api.openweathermap.org/data/2.5/weather";

const apiKey = "ee329596df76a835cfef822c61b16a6a";

const locationInput = document.querySelector("#location");
const weatherDisplay = document.querySelector("#weather");
const tempToggle = document.querySelector("#temp-toggle");
const savedAreasList = document.querySelector("#saved-areas");
const saveAreaButton = document.querySelector("#save-area");
const removeAreaButton = document.querySelector("#remove-area");


let currentLocation;
let currentData;
let currentUnit = "imperial";
let savedAreas = [];

async function fetchWeatherData(location){
    const url = `${weatherSite}?q=${location}&units=${currentUnit}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
fetchWeatherData();{
console.log("this is running");}