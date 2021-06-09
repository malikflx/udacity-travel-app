const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const { response } = require('express');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 5000;
const server = app.listen(port, function () {
  console.log(`Travel App running on localhost: ${port}!`)
});

app.use(express.static('dist'));

app.get('/', function (req, res) {
  res.sendFile(path.resolve('dist/index.html'))
});

app.post('/destination', async function (req, res) {
  const geoNamesKey = process.env.GEONAMES_API_KEY;
  const cityName = req.body.city;
  let data = {};

  const geoBaseUrl = `http://api.geonames.org/searchJSON?q=${cityName}&maxRows=1&username=${geoNamesKey}`;

  await fetch(geoBaseUrl)
    .then(response => response.json())
    .then(response => {
      const { toponymName, countryName, lat, lng } = response.genames[0];
      data = {
        cityName: toponymName, countryName, lat, lng
      }
    })
    .catch(error => console.log('error', error));
  res.send(data);
});
