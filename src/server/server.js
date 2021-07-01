// Enable dotenv for credential management
const dotenv = require('dotenv');
dotenv.config();
/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
// Express to run server and routes
const { response } = require('express');

// Start up an instance of app
const app = express();
// Cors for cross origin allowance
app.use(cors());
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Spin up the server
const port = 8082;
const server = app.listen(port, function () {
  console.log(`Travel App running on localhost: ${port}!`)
});

//Initialize the main project folder
app.use(express.static('dist'));
// app.use(express.json({ limit: '5mb' }));

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
});

// Create endpoint for API POST data
app.post('/destination', async (req, res) => {
  const weatherKey = process.env.WEATHERBIT_API_KEY;
  const geoNamesKey = process.env.GEONAMES_API_KEY;
  const pixabayKey = process.env.PIXABAY_API_KEY;
  const geoBaseURL = 'http://api.geonames.org/searchJSON?q=';
  const weatherBaseURL = 'http://api.weatherbit.io/v2.0/forcasts/daily?';
  console.log(`Your geo API Key is ${geoNamesKey}`);
  console.log(`Your weather API Key is ${weatherKey}`);
  let cityName = req.body.cityName;
  let params = `${cityName}&maxRows=1&${geoNamesKey}`;
  const getLocation = geoBaseURL + params;
  // Setup empty JS object to act as endpoint for all routes
  let data = {};

  await fetch(getLocation, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/JSON',
    }
  })
    .then(response => response.json())
    .then(response => {
      console.log('response from GeoNames (server-side)', response)
      const { lat, lng, toponymName, countryName } = response.geonames[0];
      data = {
        cityName: toponymName,
        countryName,
        lat,
        lng
      }
    }).catch(error => console.log('error', error));

  // API to get current weather
  const currentWeatherUrl = `https://api.weatherbit.io/v2.0/current?lat=${data.lat}&lon=${data.lng}&key=${weatherKey}`;

  await fetch(currentWeatherUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/JSON',
    }
  })
    .then(response => response.json())
    .then(response => {
      console.log('response from WeatherBit (server-side)', response)
      const { temp, precip } = response.data[0];
      data = {
        ...data,
        currentWeather: {
          temp,
          precip
        }
      }
    }).catch(error => console.log('error', error));

  // Get forcased weather using weatherBit API
  const forcastWeatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${data.lat}&lon=${data.lng}&key=${weatherKey}`;

  await fetch(forcastWeatherUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/JSON',
    }
  })
    .then(response => response.json())
    .then(response => {
      console.log('forecast response from WeatherBit (server-side)', response)
      data = {
        ...data, // use spread operator to pull in prior data
        forecastWeather: response.data[0]
      }
    }).catch(error => console.log('error', error));

  // Set up parameters for pixabay API endpoints
  const pixabayCitySearch = `&q=${data.cityName}&orientation=horizontal&image_type=photo`;
  const pixabayCountrySearch = `&q=${data.countryName}&orientation=horizontal&image_type=photo`
  let pixabayUrl = `https://pixabay.com/api/?key=${pixabayKey}${pixabayCitySearch}`;
  let imageUrl = '';

  await fetch(pixabayUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/JSON',
    }
  })
    .then(response => response.json())
    .then(response => {
      console.log('response from Pixabay (server-side)', response)
      imageUrl = response.hits[0].webformatURL;
    }).catch(error => console.log('error', error));

  // Detects when no city image is available. if none, search for country image instead
  if (imageUrl === '') {
    let pixabayUrl = `https://pixabay.com/api/?key=${pixabayKey}${pixabayCountrySearch}`;
    await fetch(pixabayUrl)
      .then(response => response.json())
      .then(response => {
        console.log('response from Pixabay (server-side) -> imageurl')
        imageUrl = response.hits[0].webformatURL;
      })
      .catch(error => console.log('error', error));
  }
  data = {
    ...data,
    imageUrl
  }
  // Package data to be sent to server
  res.send(data);
});