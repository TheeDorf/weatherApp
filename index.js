const API_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";

const API_KEY = "ee329596df76a835cfef822c61b16a6a";

const locationInput = document.querySelector("#location");
const weatherDisplay = document.querySelector("#weather");
const tempToggle = document.querySelector("#temp-toggle");
const savedAreasList = document.querySelector("#saved-areas");
const saveAreaButton = document.querySelector("#save-area");
const removeAreaButton = document.querySelector("#remove-area");