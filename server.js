'use strict';
// Require application dependencies
// These are express, body-parser, and request

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

// Configure dotenv package

require("dotenv").config();
// Set up your OpenWeatherMap API_KEY
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

app.get('/', (req, res) => {
// Setup your express app and body-parser configurations
// Setup your javascript template view engine
// we will serve your static pages from the public directory, it will act as your root directory
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// Setup your default display on launch

    // It will not fetch and display any data in the index page
    res.render("index", { Joke: null, error: null });
  // On a post request, the app shall data from OpenWeatherMap using the given arguments
app.post('/', function(req, res) {

    // Get city name passed in the form
    let cat = req.body.cat;
    

    // Use that city name to fetch data
    // Use the API_KEY in the '.env' file
    let url = `https://v2.jokeapi.dev/joke/${cat}`;
     // Request for data using the URL
     request(url, function(err, response, body) {

        // On return, check the json data fetched
        if (err) {
            res.render('index', { Joke: null, error: 'Error, please try again' });
        } else {
            let Joke = JSON.parse(body);
            // you shall output it in the console just to make sure that the data being displayed is what you want
            console.log(Joke);

            if (`${Joke.error}` == 'true') {
                res.render('index', { Joke: null, error: 'Error, please try again' });
            } else {
                // we shall use the data got to set up your output
                let category = `${Joke.category}`,
                 setup = `${Joke.setup}`,
                delivery = `${Joke.delivery}`;
                // you shall now render the data to your page (index.ejs) before displaying it out
                res.render("index", {
                    Joke: Joke,
                    category: category,
                    setup: setup,
                    delivery: delivery,
                    error: null,
                  });
                }
              }
          })
      });
  // you will set up your port configurations. You will also start the server and add a message to display when running.
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});