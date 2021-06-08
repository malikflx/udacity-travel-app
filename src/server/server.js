const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const { response } = require('express');

dotenv.config();
const app = express();