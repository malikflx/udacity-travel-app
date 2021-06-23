const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const { response } = require('express');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 8082;
const server = app.listen(port, function () {
  console.log(`Travel App running on localhost: ${port}!`)
});

app.use(express.static('dist'));

app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
});

app.post('/destination', function (req, res) {
  const geoBaseURL = 'http://api.geonames.org/searchJSON?q=';
  const geoNamesKey = process.env.GEONAMES_API_KEY;
  const weatherKey = process.env.WEATHERBIT_API_KEY;
  console.log(`Your API Key is ${geoNamesKey}`);
  const cityName = req.body.cityName;
  const params = `${cityName}&maxRows=1&${geoNamesKey}`;
  const getLocation = geoBaseURL + params;

  fetch(getLocation, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/JSON',
    }
  }).then((response) => {
    return response.json();
  }).then((data) => {
    console.log("Response from GeoNames (server-side)", data);
    res.send({
      geonames: data.geonames[0]
    })
  })
  // const forcastWeatherURL = `https://api.weatherbit.io/v2.0/forcasts/daily?lat=${data.geonames.lat}&lon=${data.geonames.lng}&key=${weatherKey}`;
  // fetch(forcastWeatherURL, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/JSON',
  //   }
  // }).then((response) => {
  //   return response.json();
  // }).then((data) => {
  //   console.log("Response from Weatherbit (server-side)", data);
  //   res.send({
  //     forcastWeather: response.data
  //   })
  // })
})

app.post('/weather', function (req, res) {
  const weatherBaseURL = 'http://api.weatherbit.io/v2.0/forcasts/daily?';
  const weatherKey = process.env.WEATHERBIT_API_KEY;
  console.log(`Your Weatherbit API Keyis ${weatherKey}`);
  // const cityState = req.body.cityState;
  // const params = `${cityState}&key=${weatherKey}`;
  const latitude = req.body.lat;
  const longitude = req.body.lon;
  const weatherParams = `lat=${latitude}&lon=${longitude}&key=${weatherKey}`;
  const getWeather = weatherBaseURL + weatherParams;

  fetch(getWeather, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/JSON',
    }
  }).then((response) => {
    return response.json();
  }).then((data) => {
    console.log("Response from WeatherBit (server-side)", data);
    res.send({
      forcastWeather: data.data[0]
    })
  });
})


