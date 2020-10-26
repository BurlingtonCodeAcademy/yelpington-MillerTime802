//Setting map to Stowe
let myMap = L.map("mapid").setView([44.4654, -72.6874], 13);
//bringing in ap style
L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  {
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  }
).addTo(myMap);
//map marker variable
let firstMark = L.marker([44.4654, -72.6874]).addTo(myMap);
//setting Stowe marker
firstMark.bindPopup("<h5>Welcome to Stowe!</h5>");
init();
//fecthing restaurants.json info
async function init() {
  let restaurants = await fetch("http://localhost:8000/restaurants")
    .then((data) => data.json())
    .then(function (object) {
      return object.restaurants;
    });
  console.log(restaurants);
  restaurants.forEach((restaurant) => {
    addMarker(restaurant.address, restaurant.name, restaurant.id);
  });
}
//adding markers to restaurants
function addMarker(adress, name, restaurantId) {
  fetch(
    "https://nominatim.openstreetmap.org/search/?q=" +
      adress +
      ",Stowe,VT&format=json"
  )
    .then((data) => data.json())
    .then(function (parsedData) {
      let restaurantMarker = L.marker([
        parsedData[0].lat,
        parsedData[0].lon,
      ]).addTo(myMap);
//adding pop ups to markers so I can click on them and link to that restaurant page
      restaurantMarker.bindPopup(
        `<a href = "/restaurant#${restaurantId}">${name}</a>`
      );
    });
}
