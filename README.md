# Udacity Capstone - Travel App

Capstone Project of the Udacity Front End Web Developer Nanodegree Program

The aim of this project is to use multiple APIs and build tools to assist in creating a web application that allows users to fetch the data for an upcoming trip. This data comes from several different APIs/Enpoints. When a user submits a City and a date, the web application makes use of the [Geonames API](http://www.geonames.org/export/web-services.html), [WeatherBit API](https://www.weatherbit.io/account/create), and the [Pixabay API](https://pixabay.com/api/docs/) to display the location data, weather, and photo of the trip destination.

## Technology & Build Tools
* HTML
* SASS/CSS
* JavaScript
* Node
* Express
* Webpack/webpack-dev-server
* Babel
* Jest
* Workbox/Service-Worker
* Geonames API
* WeatherBit API
* Pixabay API

## Installation
Install node and npm from your terminal
1. Clone repo 
```
git clone <repo>
```
2. Install npm
```
npm install
```
3. Install required loaders and plugins
```
# Development mode installations
npm i -D @babel/core @babel/preset-env babel-loader
npm i -D style-loader node-sass css-loader sass-loader
npm i -D clean-webpack-plugin
npm i -D html-webpack-plugin
npm i -D mini-css-extract-plugin
npm i -D optimize-css-assets-webpack-plugin terser-webpack-plugin
npm i -D workbox-webpack-plugin
```
4. Sign up for an API key at Geonames, WeatherBit, and Pixabay API websites

5. Configure environment variables
```
  npm install dotenv
  ```
  Create a `.env` file at  root of your project
  ```
  touch .env
  ```
  Add API keys to your `.env` file for each API enpoint:
  ```
GEONAMES_API_KEY=***************
WEATHERBIT_API_KEY=***************
PIXABAY_API_KEY=***************
```
6. Start the web application
`npm run build-prod` | Build project
`npm start` | Run project

7. Open browser at http://localhost:8082/

8. Enter name of city and date in their respective fields.

9. Hit submit.

## Additional Functionality
* Pull in an image for the country from Pixabay API when the entered location brings up no results (good for obscure localities).
