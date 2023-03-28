function getWeather() {
    const API_KEY = 'ee329596df76a835cfef822c61b16a6a';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
      })
      .catch(error => console.error(error));
  }
  