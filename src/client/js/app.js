// Personal API Keys
const dotenv = require('dotenv');
dotenv.config();
const geoNamesKey = process.env.GEONAMES_API_KEY;
const weatherKey = process.env.WEATHERBIT_API_KEY;
const geoBaseUrl = 'http://api.geonames.org/searchJSON?q=';
const fetch = require('node-fetch');

// Event listener to add function to HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
  const city = document.getElementById('city_input').value;
  getCity(geoBaseUrl, city, geoNamesKey)
    .then(function (data) {
      console.log(data)
      // Adding data to POST Request
      postData('/addData', {
        cityName: data.toponymName,
      })
        .then(updateUI())
    })
}

/* Function to Get Geonames API data */
const getCity = async (geoBaseUrl, city, geoNamesKey) => {
  const res = await fetch(geoBaseUrl + city)
}