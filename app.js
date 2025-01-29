const express = require("express");
const path = require("node:path");
const fs = require('fs');
const app = express();
const port = 3000;

// use of express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");


// middleware to use js and css files
app.use(express.static(path.join(__dirname, "public")));
// Define the path to your JSON file
const jsonFilePath = path.join(__dirname, 'data.json');

// Read the JSON file
let jsonData;
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the JSON file:', err);
        return;
    }

    try {
        // Parse the JSON data
        jsonData = JSON.parse(data);
        // Export the JSON data
        module.exports = jsonData;
        // You can now use jsonData in your app
        console.log('JSON data successfully read and exported:', jsonData);
    } catch (parseErr) {
        console.error('Error parsing JSON data:', parseErr);
    }
});



// routes
// home route
app.get("/", (req, res) => {
  res.status(200).render("index", jsonData.home.index);
});

// bloges at home routes
app.get("/home/:page", (req, res) => {
  const page = req.params.page || "index";
  if (jsonData.home[page]) {
    res.status(200).render(page, jsonData.home[page]);
  } else {
    res.status(404).send("Page not found");
  }
});

// fitness
app.get("/fitness", (req, res) => {
  res.status(200).render("fitness", jsonData.fitness);
});

// wellness
app.get("/wellness", (req, res) => {
  res.status(200).render("wellness", jsonData.wellness);
});

app.get("/wellness/:page", (req, res) => {
  const page = req.params.page;
  if (jsonData.wellness[page]) {
    res.status(200).render(page, jsonData.wellness[page]);
  } else {
    res.status(404).send("Page not found");
  }
});

// recipes
app.get("/recipes", (req, res) => {
  res.status(200).render("recipes", jsonData.recipes);
});

// blog
app.get("/outer_blog", (req, res) => {
  res.status(200).render("outer_blog");
});

// community
app.get("/community", (req, res) => {
  res.status(200).render("community", jsonData.community);
});

// about
app.get("/about", (req, res) => {
  res.status(200).render("about");
});

app.get("/login", (req, res) => {
  res.status(200).render("login_signup");
});

app.listen(port, () => {
  console.log(`Your server is live at the local host ${port}`);
});
