//getting the info for the restaurants
async function getRestaurant(restaurantId) {
  return fetch("/api/" + restaurantId).then((data) => data.json());
}
//putting the info from the restaurants on the page and slicing off the #
function populateInfo() {
  getRestaurant(window.location.hash.slice(1)).then(function (info) {
    console.log(info);
    document.getElementById("restaurantName").innerText = info.name;
    document.getElementById("restaurantAddress").innerText = info.address;
    document.getElementById("restaurantPhone").innerText = info.phone;
    document.getElementById("restaurantHours").innerText = info.hours;
    document.getElementById("restaurantNotes").innerText = info.notes;
  });
  
}
