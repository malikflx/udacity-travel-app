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
      document.getElementById('latitude').innerHTML = `Latitude: ${res.lat}`;
      document.getElementById('longitude').innerHTML = `Longitude: ${res.lng}`;
      document.getElementById('country').innerHTML = `Country: ${res.countryName}`;
      document.getElementById('weather').innerHTML = `Weather: ${res.currentWeather.temp}`;
      document.getElementById('image').innerHTML = `Location: ${res.imageUrl}`;
      document.getElementById('image').style.backgroundImage = `url(${res.imageUrl})`;
    })
  let n = setInterval(function () {
    let now = new Date().getTime();
    let selectedDate = document.getElementById('trip-date').value;
    let userDate = new Date(selectedDate).getTime();

    let distance = userDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('clock').innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    if (distance < 0) {
      clearInterval(n);
      document.getElementById('clock').innerHTML = "Countdown is Over!"
    }
  }, 1000);

  // .then(res => res.json())
  // .then(function (res) {
  //   console.log('response from WeatherBit (client-side)', res);
  //   document.getElementById('weather').innerHTML = `Weather: ${res.temp}`;
  // })
  // fetch('http://localhost:8082/weather', {
  //   method: 'POST',
  //   credentials: 'same-origin',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({ cityName: formCity })
  // })
  //   .then(res => res.json())
  //   .then(function (res) {
  //     console.log('response from Weatherbit (client-side)', res);
  //     document.getElementById('weather').innerHTML = `Weather: ${res.forcastWeather.data}`;
  //   })
}

export { handleSubmit }