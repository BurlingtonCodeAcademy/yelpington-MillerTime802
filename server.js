//imports
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;
const fs = require("fs");
//getting files
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});
app.get("/restaurant", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/restaurant.html"));
})
//getting json info
app.get("/api", (req, res) => {
  let file = fs.readFileSync(
    __dirname + "/public/api/restaurant-id.json",
    "utf8"
  );
  res.send(JSON.parse(file));
});
app.get("/restaurants", (req, res) => {
  let file = fs.readFileSync(
    __dirname + "/public/api/restaurants.json",
    "utf8"
  );
  res.send(JSON.parse(file));
});
app.get("/api/:restaurantId", (req, res) => {
  let id = req.params.restaurantId;

  let file = fs.readFileSync(
    __dirname + "/public/api/restaurants.json",
    "utf8"
  );
  let obj = JSON.parse(file);
  obj.restaurants.forEach((restaurant) => {
    if (restaurant.id === id) {
      res.send(restaurant);
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
