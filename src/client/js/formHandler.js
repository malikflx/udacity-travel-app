import fetch from 'node-fetch';
let finalDate = new Date("06/25/2021 00:00:00").getTime();

function handleSubmit(e) {
  e.preventDefault();
  // check city name entered into form field
  let formCity = document.getElementById('city_input').value;
  console.log('::: Form Submitted :::')
  fetch('http://localhost:8082/destination', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cityName: formCity })
  })
    .then(res => res.json())
    .then(function (res) {
      console.log('response from GeoNames (client-side)', res);
      // Add API data into empty HTML elements
      document.getElementById('latitude').innerHTML = `Latitude: ${res.lat}`;
      document.getElementById('longitude').innerHTML = `Longitude: ${res.lng}`;
      document.getElementById('country').innerHTML = `Country: ${res.countryName}`;
      document.getElementById('weather').innerHTML = `Weather: ${res.currentWeather.temp}&deg; Celsius`;
      document.getElementById('precipitation').innerHTML = `Precipitation: ${res.currentWeather.precip}`;
      document.getElementById('forecast').innerHTML = `Forecast: ${res.forecastWeather.weather.description}`;
      // document.getElementById('image').innerHTML = `Location: ${res.imageUrl}`;
      document.getElementById('image').style.backgroundImage = `url(${res.imageUrl})`;
    })

  // Set up countdown clock. Count down based on current time
  let n = setInterval(function () {
    let now = new Date().getTime(); // Get current datetime
    let selectedDate = document.getElementById('trip-date').value; // Get user input
    let userDate = new Date(selectedDate).getTime();

    let distance = userDate - now;

    // Calculate remaining time in Day, Hour, Minute, Second format
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Apply calculated time to HTML element
    document.getElementById('clock-result').innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    // When the clock strikes 0, print 'countdown is over!'
    if (distance < 0) {
      clearInterval(n);
      document.getElementById('clock-result').innerHTML = "Countdown is Over!"
    }
  }, 1000);
}

export { handleSubmit }